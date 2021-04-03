import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { TraningService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  // private isAuthentificated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingServivice: TraningService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
    ) {}

  initAuthListeners() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.authSuccessfully();
      } else {
        this.trainingServivice.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnthenticated());
        // this.isAuthentificated =false
        // this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      this.uiService.showSnackbar(err.message, null, 3000);
    })
    .finally(() => {
      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading());
    })
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      this.uiService.showSnackbar(err.message, null, 3000);
    })
    .finally(() => { 
      // this.uiService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading());
    })
  }

  logout() {
    this.afAuth.signOut();
  }

  // isAuth() {
  //   return this.isAuthentificated;
  // }
  

  private authSuccessfully() {
    this.store.dispatch(new Auth.SetAuthenticated());
    this.router.navigate(['/training']);
  }
}