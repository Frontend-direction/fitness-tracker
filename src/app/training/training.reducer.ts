import { Exercise } from './exercise.model';
import { 
  TrainingActions,
  SET_AVAILABLE_TRANINGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING, STOP_TRAINING 
} from './training.actions';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
  availableErcises: Exercise[];
  finisedExercises: Exercise[];
  activeTraining: Exercise;
}

export interface State extends fromRoot.State {
  training: TrainingState,
}

const initialState: TrainingState = {
  availableErcises: [],
  finisedExercises: [],
  activeTraining: null,
};


export function trainingReducer(state = initialState, action: TrainingActions) {
  switch(action.type) {
    case SET_AVAILABLE_TRANINGS:
      return {
        ...state,
        availableErcises: action.payload,
      }
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finisedExercises: action.payload,
      }   
    case START_TRAINING:
      return {
        ...state,
        activeTraining: { ...state.availableErcises.find(ex => ex.id === action.payload) },
      }  
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      }
    default: 
      return state;
  }
};

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableErcises); 
export const getFinishedExercises = createSelector(getTrainingState,(state: TrainingState) => state.finisedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);

export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);