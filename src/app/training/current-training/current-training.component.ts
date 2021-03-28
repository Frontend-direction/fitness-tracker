import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTraningComponent } from './stop-traning-component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;
  @Output() trainingExit = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;

       if(this.progress >= 100) {
        clearInterval(this.timer);
       }
    }, 1000)
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
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    })
  }

}
