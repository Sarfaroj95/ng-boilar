import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialsModule } from "./materials/materials.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./share/service.service";
import { TokenInterceptor } from "./share/interceptor.service";

import { NgxLoadingModule } from "ngx-loading";

import { AppComponent } from "./app.component";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { HomeComponent } from "./home/home.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { NotfoundComponent } from "./notfound/notfound.component";
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './common/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotfoundComponent,
    ProfileComponent,
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
