import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import {HttpClientModule} from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthChecker } from './auth/auth.checker';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { usersReducer } from './store/users/users.reducer';
import { environment } from 'src/environments/environment';
import { DeleteUserModalComponent } from './components/delete-user-modal/delete-user-modal.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from './components/loader/loader.component';
import { LoginGuard } from './auth/login-guard.service';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AlertComponent } from './components/alert/alert.component';
import { ConfirmPasswordValidator } from 'src/validators/confirm-password.validator';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    DashboardComponent,
    UsersComponent,
    AddUserModalComponent,
    DeleteUserModalComponent,
    LoaderComponent,
    UpdateUserComponent,
    AlertComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot({ users: usersReducer }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production
    }),
    NgxPaginationModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthChecker,
    AuthGuardService,
    LoginGuard,
    ConfirmPasswordValidator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
