import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TraningService } from '../training.service';
import { Subscription, Observable } from 'rxjs';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  // exersisesSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TraningService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsloading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    // this.exersisesSubscription = this.trainingService.exercisesChanged
    // .subscribe(exercises => {
    //   this.exercises = exercises;
    // })
    this.fetchExercises();
  }

  // ngOnDestroy(): void {
  //   if (this.exersisesSubscription) {
  //     this.exersisesSubscription.unsubscribe();
  //   }
  // }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraning(form: NgForm) {
    console.log(form.value)
    this.trainingService.startExercise(form.value.exercise)
  }

}
