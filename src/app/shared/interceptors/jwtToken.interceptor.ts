import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloned = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJociIsInJvbGVzIjpbIlJPTEVfSFIiXSwiaWF0IjoxNTk1OTY2MTkwLCJleHAiOjE1OTU5Njk3OTB9.zdHXNANqXqzz3NPZXPZWFvys48bUFj2n9kD9sku_8vk'
      ),
    });
    return next.handle(cloned);
  }
}
