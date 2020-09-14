import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class BaseServices {

    constructor(
        private _http: HttpClient
    ) { }
    /*  ..............................calling the Post APi...............................  */
    public postRequest(url: string, param: any): Observable<any> {
        let body = param;
        let header: any = { 'Content-Type':'application/json' };
        return this._http.post(url, body, { headers: header }).pipe(map((response: Response) => response),
            catchError((e) => this.handleError(e)));
    }
    /* ..............................completed .............................................. */

    /* calling the get Releted APi   */
    public getRequest(url: string): Observable<any> {
        let header: any = { 'Content-Type':'application/json'};
        return this._http.get(url, { headers: header })
            .pipe(map((response: Response) => response),
                catchError((e) => this.handleError(e)));
    }
    public getRequestForSpacex(url: string): Observable<any> {
        return this._http.get(url)
            .pipe(map((response: Response) => response),
                catchError((e) => this.handleError(e)));
    }
    /* ...................................completed.............................. */


    /* Handeling the Error Which is comming after http Request Made  */
    public handleError(errorResponse: any): Observable<never> {
        if (typeof errorResponse._body == "string")
            return throwError(JSON.parse(errorResponse._body).error.message || 'Server error');
        else
            return throwError('Server error');
    }
    /* .........................completd......................................... */
}