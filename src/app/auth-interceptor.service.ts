import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Request on its way");
        const modifiedReq = req.clone({headers:req.headers.append('Auth', 'xyz')});
        return next.handle(modifiedReq).pipe(tap(event => {
            console.log(event);
            if(event.type === HttpEventType.Response){
                console.log('response arrived');
            }
        }));
    }

}