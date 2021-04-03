import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { Exercise } from '../exercise.model';
import { TraningService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedcolumns: string[] = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  // private exChangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private traningService: TraningService,
    private store: Store<fromTraining.State>
    ) { }

  ngOnInit(): void {
    // this.exChangedSubscription = this.traningService.finishedExercisesChanged
    this.store.select(fromTraining.getFinishedExercises)
    .subscribe((exersicesArr: Exercise[]) => {
      this.dataSource.data = exersicesArr;
    })
    this.traningService.fetchCompletedOrCancelledExercises()

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // ngOnDestroy() {
  //   if(this.exChangedSubscription) {
  //     this.exChangedSubscription.unsubscribe();
  //   }
  // }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
