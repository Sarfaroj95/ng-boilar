import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/share/service.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  id;

  constructor(private router: Router, private auth: AuthService) {
    this.id = localStorage.getItem("id");
    if (this.id == null) {
      this.router.navigate(["/signin"]);
    }
  }

  ngOnInit() {}
  logout() {
    this.auth.deleteId();
    this.auth.deleteToken();
    this.router.navigate(["/signin"]);
  }
}
