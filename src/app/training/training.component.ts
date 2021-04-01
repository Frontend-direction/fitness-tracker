import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TraningService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {
  ongoingTraning = false;
  exerciseSubscription: Subscription;
  
  constructor(private traningService: TraningService) { }

  ngOnInit(): void {
    this.exerciseSubscription = this.traningService.exercisesChanges.subscribe(exercise => {
      this.ongoingTraning = exercise ? true : false;
    }) 
  }

}
