import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable()
export class HtppInterceptor implements HttpInterceptor {
    constructor(private token: TokenService) { 
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = this.token.getToken()
        req = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + token)
        })
        return next.handle(req);
    }
}

export const httpInterceptorProviders = [
    {   provide: HTTP_INTERCEPTORS,
        useClass: HtppInterceptor,
        multi: true }
];
