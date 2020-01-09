import { AuthService } from './../_service/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model:any={};
  @Output() cancelRegister=new EventEmitter();

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  register(){
    this.auth.register(this.model).subscribe(()=>{
      console.log("Register Success");
    }, err =>{
      console.log(err);
    })
  }

  cancel(){
    // console.log('cancel register');
    this.cancelRegister.emit(false);
  }
}
