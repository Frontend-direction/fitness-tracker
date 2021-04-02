import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { TraningService } from '../training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthentificated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingServivice: TraningService,
    ) {}

  initAuthListeners() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.authSuccessfully();
      } else {
        this.trainingServivice.cancelSubscriptions();
        this.isAuthentificated =false
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

  login(authData: AuthData) {
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log(err))
  }

  logout() {
    this.afAuth.signOut();
  }

  isAuth() {
    return this.isAuthentificated;
  }
  

  private authSuccessfully() {
    this.isAuthentificated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}