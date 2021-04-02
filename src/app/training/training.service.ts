import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { Exercise } from "./exercise.model";
import { map as _map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';

@Injectable()
export class TraningService {
  exercisesChanges = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercise: Exercise[] = [];
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    ){}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db
    .collection('availableExersices')
    .snapshotChanges()
    .pipe(
      _map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: (doc.payload.doc.data() as Exercise).name,
            calories: (doc.payload.doc.data() as Exercise).calories,
            duration: (doc.payload.doc.data() as Exercise).duration,
          }
        })
      })
    )
    .subscribe((exercises: Exercise[]) => {
      this.uiService.loadingStateChanged.next(false);
      this.availableExercise = exercises;
      this.exercisesChanged.next([...this.availableExercise]);
    }, error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Showing Exercise failed, Please try again later', null, 3000);
      this.exercisesChanged.next(null); 
    }))
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exercisesChanges.next({...this.runningExercise})
  }

  completeExersice() {
    this.addDataToDataBase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exercisesChanges.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDataBase({
      ...this.runningExercise,
      duration: Math.floor(this.runningExercise.duration * (progress / 100)),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exercisesChanges.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => {
      sub.unsubscribe();
    })
  }
  

  private addDataToDataBase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }

}