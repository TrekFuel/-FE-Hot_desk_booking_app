import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtTokenInterceptor } from './shared/interceptors/jwtToken.interceptor';

export class AppInterceptors {
  static interceptors: any = [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
  ];
}
