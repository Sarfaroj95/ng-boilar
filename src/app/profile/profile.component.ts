import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../share/service.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  id;
  Details = [];

  constructor(private router: Router, private auth: AuthService) {
    this.id = localStorage.getItem("id");
    if (this.id == null) {
      this.router.navigate(["/signin"]);
    }
  }

  ngOnInit() {
    this.UserData();
  }

  UserData() {
    let val = localStorage.getItem("id");
    this.auth.MainUserdata(val).subscribe(result => {
      this.Details = result;
    });
  }

  logout() {
    this.auth.deleteToken();
    this.router.navigate(["signin"]);
  }
}
