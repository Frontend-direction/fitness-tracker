import { NgModule } from "@angular/core";

import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AngularFirestoreModule } from "@angular/fire/firestore";

@NgModule({
  declarations:[
    SignupComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireAuthModule,
    SharedModule,
    AuthRoutingModule,
    AngularFirestoreModule,
  ],
  exports: [],
})
export class AuthModule{}