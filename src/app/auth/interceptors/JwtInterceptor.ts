import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authenticatedUser = this.authService.authenticatedUser;

    if (authenticatedUser && authenticatedUser.accessToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authenticatedUser.accessToken}`
        }
      });
    }

    return next.handle(req);
  }

}
