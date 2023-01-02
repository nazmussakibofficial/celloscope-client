import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { UserData } from '../user.data';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  public logMsg: string = '';
  public users: any = [];
  public message = 'status: N/A';

  constructor(private userData: UserData, private toastr: ToastrService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
    if (this.authService.isLoggedIn) {
      this.message = 'status: logged in'
    }
  }

  login() {
    this.authService.login().subscribe((res) => {
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';
        this.message = 'status: logged in'

        this.router.navigateByUrl(redirect);
      }
    });
  }

  onSubmit(Login: any) {
    this.logMsg = '';
    fetch(`https://celloscope-server.vercel.app/login/${Login.value.userId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Login.value)
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Login Successful") {
          this.toastr.success('', 'You are now logged in');
          this.router.navigate(["/dashboard"]);
          this.login();
          return;
        }
        this.logMsg = data.message;
      })
      .catch(e => { })
  }
}
