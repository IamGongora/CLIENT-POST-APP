import { computed, Injectable, signal } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { catchError, map, Observable, of } from 'rxjs';

type AuthStatus = 'cheking' | 'authenticated' | 'not-authenticated'

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseHttpService {

  private _authStatus = signal<AuthStatus>('cheking');
  private _user = signal <any>(null);
  private _token = signal<String | null>(localStorage.getItem('token'));

  authStatus = computed (()=>{
    if(this._authStatus()==='cheking') return 'cheking';
    if (this._user())return 'authenticated';
    return 'not-authenticated';
  });
  user = computed (()=>this._user());
  token = computed(()=>this._token());
  isAdmin = computed(()=>this._user()?.role?.name.includes('admin') ?? false);

 login(email: string, password: string): Observable<boolean> {
  return this.http
  .post<any>(`${this.apiUrl}/auth/login`, { email, password })
  .pipe(
    map((resp) => {
      this._user.set(resp.data.user);
      this._token.set(resp.data.token);
      this._authStatus.set('authenticated');
      localStorage.setItem('token',resp.data.token);
      localStorage.setItem('user',JSON.stringify(resp.data.user));
      return true;
    }),
    catchError((error:any)=>{
      this._user.set('');
      this._token.set('');
      this._authStatus.set('not-authenticated');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return of(false)
    })
    );
  }
}
