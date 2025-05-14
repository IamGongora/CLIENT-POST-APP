import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  authService = inject(AuthService);
fb = inject(FormBuilder);
hasError = signal(false);
type ='';
icon ='';
  showPassword(type:string){
  if (type ==='password'){
    this.type='text';
    this.icon='bi bi-eye-slash';
  }else{
    this.type='password';
    this.icon = 'bi bi-eye'
  }
}
loginForm = this.fb.group({
  email:['',[Validators.required,Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]]
});
onSubmit(){
  if(this.loginForm.invalid){
    this.hasError.set(true);
      setTimeout(()=>{
        this.hasError.set(false);
      },2000);
      return
    }
    const {email ='', password=''} = this.loginForm.value;
    this.authService.login(email!,password!).subscribe((isAuthenticated)=>{
      if (isAuthenticated){
        alert('logueado')
        return
      }
        this.hasError.set(true);
        setTimeout(()=>{
          this.hasError.set(false);
        },2000);
        return;
    })
  }
}
