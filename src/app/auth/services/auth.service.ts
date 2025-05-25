import { computed, Injectable, signal } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { catchError, map, Observable, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpHeaders } from '@angular/common/http';


type AuthStatus = 'cheking' | 'authenticated' | 'not-authenticated'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  private _authStatus = signal<AuthStatus>('cheking');
  private _user = signal <any>(null);
  private _token = signal<String | null>(localStorage.getItem('token'));

  checkStatusResource = rxResource({
    loader: ()=> this.checkStatus(),
  })

  authStatus = computed (()=>{
    if(this._authStatus()==='cheking') return 'cheking';
    if (this._user())return 'authenticated';
    return 'not-authenticated';
  });
  user = computed (()=>this._user());
  token = computed(()=>this._token());
  isAdmin = computed(()=>this._user()?.role?.name.includes('admin') ?? false);

login(email: string, password: string): Observable<boolean> {
  const headers = new HttpHeaders({
    'x-api-key': '71f3a2b2-643f-4b57-9c29-9019f8f69d6b', // reemplaza con tu clave real
    'Content-Type': 'application/json'
  });

  return this.http
    .post<any>(`${this.apiUrl}/auth/login`, { email, password }, { headers })
    .pipe(
      map((resp) => this.handlerAuthSuccess(resp)),
      catchError((error: any) => this.handlerAuthError(error))
    );
}

  register (data:any):Observable<boolean>{
    return this.http.post<any>(`${this.apiUrl}/auht/register`,data)
    .pipe(
      map((resp)=>this.handlerAuthSuccess(resp)),
      catchError((error:any)=> this.handlerAuthError(error))
    );
  }


checkStatus(): Observable<boolean> {
  const token = localStorage.getItem('token');

  if (!token) {
    this.logout();
    return of(false);
  }

  const headers = new HttpHeaders({
    'x-api-key': '71f3a2b2-643f-4b57-9c29-9019f8f69d6b',
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<any>(`${this.apiUrl}/auth/check-status`, { headers }).pipe(
    map((resp) => this.handlerAuthSuccess(resp)),
    catchError((error: any) => this.handlerAuthError(error))
  );
}


    

  logout():void{
      this._token.set('');
      this._authStatus.set('not-authenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  }
  private handlerAuthSuccess (reps:any){
    this._user.set(reps.data.user);
      this._token.set(reps.data.token);
      this._authStatus.set('authenticated');
      localStorage.setItem('token',reps.data.token);
      localStorage.setItem('user',JSON.stringify(reps.data.user));
      return true;
  }
  private handlerAuthError (error:any){
      this.logout();
      return of(false)
  }
}
