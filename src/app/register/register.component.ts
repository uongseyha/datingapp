import { Route, Router } from '@angular/router';
import { AlertifyService } from './../_service/alertify.service';
import { AuthService } from './../_service/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:User;
  @Output() cancelRegister=new EventEmitter();
  registerForm:FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private auth: AuthService,
    private alertifyService: AlertifyService,
    private fb:FormBuilder,
    private router:Router
    ) { }

  ngOnInit() {
    this.bsConfig={
      containerClass:'theme-red'
    },
    this.createRegisterForm();

    // this.registerForm=new FormGroup({
    //   username: new FormControl('',Validators.required),
    //   password: new FormControl('',[Validators.required,Validators.minLength(2)]),
    //   confirmPassword: new FormControl('',[Validators.required])
    // },
    // this.passwordMatchValidator)
    
  }

  createRegisterForm(){
    this.registerForm=this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:[null,Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(2)]],
      confirmPassword:['',Validators.required]
    },{validators:this.passwordMatchValidator})
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value===g.get('confirmPassword').value? null:{'mismatch':true};
  }

  register(){

    if (this.registerForm.valid){
      this.user=Object.assign({},this.registerForm.value);
      this.auth.register(this.user).subscribe(()=>{
        this.alertifyService.success("Register success");
      },err => {
        this.alertifyService.error(err);
      },()=>{
        this.auth.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']);
        })
      })
    }
    

    // this.auth.register(this.model).subscribe(()=>{
    //   this.alertifyService.success("Register Success");
    // }, err =>{
    //   this.alertifyService.error(err);
    // })

    console.log(this.registerForm.value);
  }

  cancel(){
    // console.log('cancel register');
    this.cancelRegister.emit(false);
  }
}
