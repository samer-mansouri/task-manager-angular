import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { AuthGuardService } from "./auth/auth-guard.service";
import { LoginGuard } from "./auth/login-guard.service";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./components/main/main.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { UsersComponent } from "./components/users/users.component";

const routes: Routes = [
    { path: "", component: MainComponent, canActivate : [AuthGuardService],
      children: [
        {path: "accueil", component: DashboardComponent},
        {path: "utilisateurs", component: UsersComponent},
        {path: "settings", component: UpdateUserComponent}
      ]
    },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
}) 

export class AppRoutingModule { }