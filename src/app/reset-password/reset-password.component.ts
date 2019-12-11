import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  formReset: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formReset = this.fb.group(
      {
        password: ["", Validators.required],
        conPassword: ["", Validators.required]
      },
      { validator: this.checkPasswords }
    );
  }

  Reset() {
    let val = this.formReset.value;
    console.log("data", val);
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
