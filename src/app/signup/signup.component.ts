import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { ErrorStateMatcher, MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { AuthService } from "../share/service.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  hide = true;
  formRegister: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.formRegister = this.fb.group(
      {
        first_name: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]*$")]
        ],
        last_name: [
          "",
          [Validators.required, Validators.pattern("^[a-zA-Z]*$")]
        ],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(
              "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
            )
          ]
        ],
        password: ["", Validators.required],
        conPassword: ["", Validators.required]
      },
      { validator: this.checkPasswords }
    );
  }

  SignUp() {
    let val = this.formRegister.value;
    delete this.formRegister.value.conPassword;
    console.log("data", val);
    this.auth.MainRegister(val).subscribe(
      result => {
        console.log("resiter success");

        let action = "Success";
        let msgs = "Your register success";
        this.snackbar.open(msgs, action, {
          duration: 2000
          // verticalPosition: "top"
        });
        this.router.navigate(["/signin"]);
      },
      error => {
        console.log("register failed", error.error);
        let action = " Error";
        let msgs = "Something is wrong";
        this.snackbar.open(msgs, action, {
          duration: 2000
          // verticalPosition: "top"
        });
      }
    );
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get("password").value;
    let confirmPass = group.get("conPassword").value;
    return pass === confirmPass ? null : { notSame: true };
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}
