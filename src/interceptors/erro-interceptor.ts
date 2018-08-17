import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
  HttpEvent
} from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";
import { Injectable } from "../../node_modules/@angular/core";

@Injectable()
export class ErroInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Passou no interceptor');
    return next.handle(req)
      .catch((error, caught) => {
        let errorObj = error;

        if(errorObj.error) {
          errorObj = errorObj.error;
        }

        if(!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        console.log('Erro detectado pelo interceptor: ', errorObj);

        return Observable.throw(errorObj);
      }) as any;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErroInterceptor,
  multi: true
}
