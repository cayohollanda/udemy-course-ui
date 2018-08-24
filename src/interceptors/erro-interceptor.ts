import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
  HttpEvent
} from "../../node_modules/@angular/common/http";
import { Observable } from "../../node_modules/rxjs/Rx";
import { Injectable } from "../../node_modules/@angular/core";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErroInterceptor implements HttpInterceptor {

  constructor(
    public storage: StorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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

        switch(errorObj.status) {
          case 403:
            this.handle403();
            break;
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  handle403() {
    this.storage.setLocalUser(null)
  }

}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErroInterceptor,
  multi: true
}
