import { Component, OnInit } from '@angular/core';
import { UserData } from '../user.data';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  public regMsg: string = '';
  public users: any = [];

  constructor(private userData: UserData) { }

  ngOnInit() {
    this.userData.getUsers().subscribe(data => this.users = data)
  }


  onSubmit(Register: any) {
    const alreadyExists = this.users.find((user: any) => user.userId === Register.value.userId)
    if (alreadyExists) {
      this.regMsg = "User Already Exists";
      return;
    }

    fetch('https://celloscope-server.vercel.app/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(Register.value)
    })
      .then(res => res.json())
      .then(data => {
        this.regMsg = "User Created Successfully"
      })
      .catch(e => console.log(e))


  }

}
