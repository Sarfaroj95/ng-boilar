import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = "https://boilar.herokuapp.com";
  private UserSignUrl = this.baseUrl + "/api/v1/user/login";
  private UserSignupUrl = this.baseUrl + "/api/v1/user/register";
  private UserDataUrl = this.baseUrl + "/api/v1/user/userdata/";

  private SubUserAdd = this.baseUrl + "/api/v1/user/adduser";
  private SubuserDataUrl = this.baseUrl + "/api/v1/user/subuser";
  private SubUserOneUrl = this.baseUrl + "/api/v1/user/subuser/";

  MainLogin(val): Observable<any> {
    return this.http.post(this.UserSignUrl, val);
  }
  MainRegister(val): Observable<any> {
    return this.http.post(this.UserSignupUrl, val);
  }
  MainUserdata(v): Observable<any> {
    return this.http.get(this.UserDataUrl + v);
  }

  SubUserdata(): Observable<any> {
    return this.http.get(this.SubuserDataUrl);
  }

  SubUseradd(val): Observable<any> {
    return this.http.post(this.SubUserAdd, val);
  }
  UserOne(v): Observable<any> {
    return this.http.get(this.SubUserOneUrl + v);
  }

  SubUserUpdate(v, val): Observable<any> {
    return this.http.post(this.SubUserOneUrl + v, val);
  }
  SubUserDelete(v): Observable<any> {
    return this.http.delete(this.SubUserOneUrl + v);
  }

  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    return localStorage.removeItem("token");
  }
  deleteId() {
    return localStorage.removeItem("id");
  }
}
