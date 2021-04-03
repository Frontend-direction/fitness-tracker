import { Observable, Subscription } from 'rxjs';
import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output()sideNavToggle = new EventEmitter<void>();

  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
    ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth)
    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
  }

  toggleSideNav() {
    this.sideNavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy () {
    this.authSubscription.unsubscribe();
  }

}
