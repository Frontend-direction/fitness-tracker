import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TraningService } from '../training.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map as _map, tap  } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<Exercise[]>;
  
  constructor(
    private trainingService: TraningService,
    private db: AngularFirestore
    ) { }

  ngOnInit(): void {
    this.exercises = this.db
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

  }

  onStartTraning(form: NgForm) {
    console.log(form.value)
    this.trainingService.startExercise(form.value.exercise)
  }

}
