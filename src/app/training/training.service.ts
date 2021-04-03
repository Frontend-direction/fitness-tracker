import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { pipe, Subject } from 'rxjs';
import { Exercise } from "./exercise.model";
import { map as _map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import  * as fromTraining from './training.reducer';
import { Store } from '@ngrx/store';
import * as Training from './training.actions';

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
    private store: Store<fromTraining.State>
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
      this.store.dispatch(new Training.SetAvailbaleTrainings(exercises));
      // this.availableExercise = exercises;
      // this.exercisesChanged.next([...this.availableExercise]);
    }, error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.showSnackbar('Showing Exercise failed, Please try again later', null, 3000);
      this.exercisesChanged.next(null); 
    }))
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
    // this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    // this.exercisesChanges.next({...this.runningExercise})
  }

  completeExersice() {
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe(ex => {
      this.addDataToDataBase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
      this.store.dispatch(new Training.StopTraining());
    })
    // this.runningExercise = null;
    // this.exercisesChanges.next(null);
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining)
    .pipe(take(1))
    .subscribe(ex => {
      this.addDataToDataBase({
        ...ex,
        duration: Math.floor(ex.duration * (progress / 100)),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
    })
    // this.runningExercise = null;
    // this.exercisesChanges.next(null);
    this.store.dispatch(new Training.StopTraining());
  }

  // getRunningExercise() {
  //   return {...this.runningExercise};
  // }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
      // this.finishedExercisesChanged.next(exercises);
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