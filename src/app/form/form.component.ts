import { Component, OnInit } from '@angular/core';
import { UserData } from '../user.data';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public users: any = [];
  public show: boolean = false;

  showPassword() {
    this.show = !this.show;
  }

  constructor(private userData: UserData, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
  }


  onSubmit(Register: any) {
    const isLoggedIn = false;
    const { email, gender, mobileNo, password, selectedDate, userId, userName } = Register.value;
    const userInfo = { email, gender, mobileNo, password, selectedDate, userId, userName, isLoggedIn }

    const alreadyExists = this.users.find((user: any) => user.userId === Register.value.userId || user.mobileNo === Register.value.mobileNo || user.email === Register.value.email)
    if (alreadyExists) {
      this.toastr.error('You already have an existing account with same email/mobile number/name', 'Sorry!');
      return;
    }

    fetch('https://celloscope-server.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
      .then(res => res.json())
      .then(data => {
        this.toastr.success('You are now registered', 'Congratulations!');
        this.router.navigate(["/login"]);
      })
      .catch(e => console.log(e))


  }

}
