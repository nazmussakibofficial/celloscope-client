import { Component } from '@angular/core';
import { UserData } from '../user.data';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public updateMsg: string = '';
  public users: any = [];

  constructor(private userData: UserData) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
  }


  onSubmit(Update: any) {
    const exists = this.users.find((user: any) => user.userId === Update.value.userId)
    if (!exists) {
      this.updateMsg = "User Doesn't Exist";
      return;
    }
    const password = Update.value.password

    fetch(`https://celloscope-server.vercel.app/user/${Update.value.userId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ password })
    })
      .then(res => res.json())
      .then(data => {
        this.updateMsg = "Updated successfully";
      })


  }

}
