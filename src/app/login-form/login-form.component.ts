import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../user.data';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public logMsg: string = '';
  public users: any = [];

  constructor(private userData: UserData, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
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
          return;
        }
        this.logMsg = data.message;
      })
      .catch(e => { })
  }
}
