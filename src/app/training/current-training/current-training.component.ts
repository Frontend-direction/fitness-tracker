import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TraningService } from '../training.service';
import { StopTraningComponent } from './stop-traning-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;

  constructor(private dialog: MatDialog, private trainingService: TraningService) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;

       if(this.progress >= 100) {
         this.trainingService.completeExersice();
        clearInterval(this.timer);
       }
    }, step)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTraningComponent, {
      data:{
        progress: this.progress,
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer();
      }
    })
  }

}
