import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  id;
  constructor(private router: Router) {
    this.id = localStorage.getItem("id");
    if (this.id == null) {
      this.router.navigate(["/signin"]);
    }
  }

  ngOnInit() {}
}
