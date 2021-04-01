import { Subject } from 'rxjs';
import { Exercise } from "./exercise.model";

export class TraningService {
  exercisesChanges = new Subject<Exercise>();
  private availableExercise: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8} 
  ];

  private runningExercise: Exercise;
  private exersices: Exercise[] = [];


  getAvailableExercises() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    this.exersices.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = this.availableExercise.find(ex => ex.id === selectedId);
    this.exercisesChanges.next({...this.runningExercise})
  }

  completeExersice() {
    this.exersices.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exercisesChanges.next(null);
  }

  cancelExercise(progress: number) {
    this.exersices.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exercisesChanges.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

}