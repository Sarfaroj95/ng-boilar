import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { AuthService } from "../share/service.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  hide = true;
  public loading = false;
  formLogin: FormGroup;
  token;

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.router.navigate(["/main"]);
    }
  }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formLogin = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  SignIn() {
    this.loading = true;
    let val = this.formLogin.value;
    console.log("data", val);
    this.auth.MainLogin(val).subscribe(
      result => {
        localStorage.setItem("token", result.access);
        localStorage.setItem("id", result.data);

        console.log("login success", result.success === true);
        if ((result.success = true)) {
          this.router.navigate(["/main"]);
        }
      },
      error => {
        console.log("login failed");
        console.log("iam new in this app");
        let msg = error.error;
        let action = " Error";
        let msgs = "Your email or password is wrong";
        this.snackbar.open(msgs, action, {
          duration: 2000
          // verticalPosition: "top"
        });
      }
    );
  }
}
