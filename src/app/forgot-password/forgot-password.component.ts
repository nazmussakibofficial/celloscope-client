import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserData } from '../user.data';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public users: any = [];

  constructor(private userData: UserData, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
  }


  onSubmit(Update: any) {
    const exists = this.users.find((user: any) => user.userId === Update.value.userId && user.email === Update.value.email)
    if (!exists) {
      this.toastr.error("User and email Address doesn't match or exist", 'Sorry!');
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
        this.toastr.success('', 'Password is updated');
        this.router.navigate(["/"]);
      })


  }

}
