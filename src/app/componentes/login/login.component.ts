import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  constructor(private router:Router, private flashMessages:FlashMessagesService, private loginService:LoginService) { }

  //Revisa si el usuario esta logueado y si no lo redirije
  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  login(){
    this.loginService.login(this.email, this.password)
    //Como esto regresa una promesa defino que hara dependiendo del resultado del login
    .then(res => {
      this.router.navigate(['/']);
    })
    .catch(error =>{
      this.flashMessages.show(error.message, {
        cssClass: 'alert-danger', timeout: 4000
      });
    });
  }

}
