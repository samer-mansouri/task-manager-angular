import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    


    if (!request.url.includes('login')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || "a").access_token}`
        }
      });
    }
    return next.handle(request);
  }
}