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
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public storage: StorageService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const localUser = this.storage.getLocalUser();

    // Fazendo com que a requisição só seja enviada se for para a API, e não para
    // o Amazon S3
    const n = API_CONFIG.baseUrl.length;
    const requestToAPI = req.url.substring(0, n) === API_CONFIG.baseUrl;

    if(localUser && requestToAPI) {
      const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${localUser.token}`) })
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

// Declarando o provider
export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
