import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { Observable, of } from 'rxjs';
import { User, UsersResponse } from '../interfaces/user.interface';

const emptyUser : UsersResponse={
  success: false,
  message: '',
  data : {} as User, 
};

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseHttpService {
  getUsers():Observable<UsersResponse>{
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`);
  }

  getUser(id: String):Observable<UsersResponse>{
    if (id === "new") return of(emptyUser);

    return this.http.get<UsersResponse>(`${this.apiUrl}/users/${id}`);
  }
  
}
