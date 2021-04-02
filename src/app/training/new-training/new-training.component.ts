import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TraningService } from '../training.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exersisesSubscription: Subscription;
  isLoading = false;

  constructor(
    private trainingService: TraningService,
    ) { }

  ngOnInit(): void {
    this.exersisesSubscription = this.trainingService.exercisesChanged
    .subscribe(exercises => {
      this.exercises = exercises;
    })
    this.fetchExercises();
  }

  ngOnDestroy(): void {
    this.exersisesSubscription.unsubscribe();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraning(form: NgForm) {
    console.log(form.value)
    this.trainingService.startExercise(form.value.exercise)
  }

}
