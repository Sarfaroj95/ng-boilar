import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../share/service.service";
import {
  MatTableDataSource,
  MatSnackBar,
  throwMatDialogContentAlreadyAttachedError,
  MatPaginator,
  MatSort
} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  formAddUser: FormGroup;
  id;
  details;
  displayedColumns = ["name", "mobile", "email", "action"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  show: boolean = true;
  subone = [];
  constructor(
    private router: Router,
    private auth: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.id = localStorage.getItem("id");
    if (this.id == null) {
      this.router.navigate(["/signin"]);
    }
    this.initForm();
  }

  ngOnInit() {
    this.SubUser();
  }
  initForm() {
    this.formAddUser = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]],
      mobile: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern("^[0-9]*$")
        ]
      ],
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

  AddNew() {
    let val = this.formAddUser.value;
    console.log("userdata", val);
    this.auth.SubUseradd(val).subscribe(
      result => {
        console.log("register success", result);
        if ((result.register = true)) {
          this.SubUser();
          this.formAddUser.reset();
          let action = "Success";
          let msgs = "New user add success";
          this.snackbar.open(msgs, action, {
            duration: 2000,
            verticalPosition: "top"
          });
        }
      },
      error => {
        console.log("faild", error.error);
        let er = error.error.errors[0];

        let action = er.title;
        let msgs = er.details;
        this.snackbar.open(msgs, action, {
          duration: 2000,
          verticalPosition: "top"
        });
      }
    );
  }

  Edit(v) {
    console.log("Id", v);
    this.show = false;
    this.auth.UserOne(v).subscribe(result => {
      console.log("one", result);
      this.subone = result;
    });
  }

  Update(v) {
    let val = this.formAddUser.value;
    console.log("Update Data", val, v);
    this.auth.SubUserUpdate(v, val).subscribe(result => {
      console.log("update", result);
      if ((result.success = true)) {
        this.SubUser();
        let action = "Success";
        let msgs = "Update success";
        this.snackbar.open(msgs, action, {
          duration: 2000,
          verticalPosition: "top"
        });
        this.formAddUser.reset();
      }
    });
  }
  Delete(v) {
    this.auth.SubUserDelete(v).subscribe(result => {
      console.log("Delete", result);
      if ((result.Delete = true)) {
        this.SubUser();
        let action = "Success";
        let msgs = "Delete success";
        this.snackbar.open(msgs, action, {
          duration: 2000,
          verticalPosition: "top"
        });
      }
    });
  }

  SubUser() {
    this.auth.SubUserdata().subscribe(result => {
      console.log("data", result);
      this.details = new MatTableDataSource(result);
      this.details.paginator = this.paginator;
      this.details.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.details.filter = filterValue.trim().toLowerCase();
  }
}
