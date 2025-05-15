import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();

let headers = req.headers;

headers = headers.set('Authorization', `Bearer ${token}`);
headers = headers.set('x-api-key', environment.apikey);

const newReq = req.clone({
  headers,
});
  return next(req);
};
