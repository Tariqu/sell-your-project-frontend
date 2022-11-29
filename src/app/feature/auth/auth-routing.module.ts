import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "src/app/shared/not-found/not-found.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const route: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: '', redirectTo: '/auth/login', pathMatch: 'full'}
]


@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}