import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HomeComponent } from "./home/home.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  { path: "", redirectTo: "/signin", pathMatch: "full" },
  { path: "signin", component: SigninComponent },
  { path: "signup", component: SignupComponent },
  { path: "forgot", component: ForgotPasswordComponent },
  { path: "reset", component: ResetPasswordComponent },
  // { path: "**", redirectTo: "/404" },
  // { path: "404", component: NotfoundComponent }

  {
    path: "main",
    component: DashboardComponent,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
