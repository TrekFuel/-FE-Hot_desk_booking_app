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
        'Bearer_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJociIsInJvbGVzIjpbIlJPTEVfSFIiXSwiaWF0IjoxNTk1ODI1NTE2LCJleHAiOjE1OTU4MjkxMTZ9.SYyOm0ApTB8Sp5ZIDlHDS9w3OwoNxznf2n64WTUAMxk'
      ),
    });
    return next.handle(cloned);
  }
}
