import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TraningService } from './training.service';
import {  Store } from '@ngrx/store';
import * as fromTraining from './training.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraning$: Observable<boolean>;
  exerciseSubscription: Subscription;
  
  constructor(
    private traningService: TraningService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    this.ongoingTraning$ = this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.traningService.exercisesChanges.subscribe(exercise => {
    //   this.ongoingTraning = exercise ? true : false;
    // }) 
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }

}
