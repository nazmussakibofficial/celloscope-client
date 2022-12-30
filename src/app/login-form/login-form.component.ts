import { Component } from '@angular/core';
import { UserData } from '../user.data';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  public logMsg: string = '';
  public users: any = [];

  constructor(private userData: UserData) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
  }

  onSubmit(Login: any) {
    fetch(`https://celloscope-server.vercel.app/login/${Login.value.userId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Login.value)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          this.logMsg = "Login Successful";
        }
        else {
          this.logMsg = "Username or password doesn't match";
        }
      })
      .catch(e => { })
  }
}
