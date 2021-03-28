import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  @Output() traningStart = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onStartTraning() {
    this.traningStart.emit();
  }

}
