import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.forgotForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ]
    });
  }
  Submit() {
    let val = this.forgotForm.value;
    console.log("data", val);
  }
}
