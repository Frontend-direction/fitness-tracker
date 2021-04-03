import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTraningComponent } from './current-training/stop-traning-component';
import { SharedModule } from '../shared/shared.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTraningComponent
  ],
  imports: [
    MatDialogModule,
    SharedModule,
    AngularFirestoreModule,
  ],
  entryComponents: [StopTraningComponent]
})
export class TrainingModule {}
