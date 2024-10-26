import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { ErrorService } from "../../shared/services/error/error.service";

export function errorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const errorService = inject(ErrorService);
  return next(req).pipe(
    catchError((error) => {
      errorService.setError(error.error);
      return throwError(() => error);
    })
  );
}
