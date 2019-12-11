import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../share/service.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  id;
  name = "Sarfaroj Gayen";
  email = "sarfaroj@gmail.com";

  constructor(private router: Router, private auth: AuthService) {
    this.id = localStorage.getItem("id");
    if (this.id == null) {
      this.router.navigate(["/signin"]);
    }
  }

  ngOnInit() {
    // this.UserData();
  }

  // UserData() {
  //   let val = localStorage.getItem("id");
  //   this.auth.MainUserdata().subscribe(result => {
  //     console.log("Data", result);
  //   });
  // }

  logout() {
    this.auth.deleteToken();
    this.router.navigate(["signin"]);
  }
}
