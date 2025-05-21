import { Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/services/base-http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseHttpService {

  getUsers():Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }
  
}
