import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginFormComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: FormComponent },
      { path: 'login', component: LoginFormComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]),
    HotToastModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
