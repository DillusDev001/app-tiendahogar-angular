import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { urlBaseApi, versionApi } from "../../../server.utils";
import { ApiResult } from "../../../../interfaces/api.interface";

@Injectable({
    providedIn: 'root'
})
export class CuentaBancariaService {

    constructor(private http: HttpClient) { }

    urlBase: string = urlBaseApi;
    urlVersion: string = versionApi;
    urlModule: string = '/cuenta-bancaria';

    public cuentaBancariaCreateMultiple(data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/multiple';
        return this.http.post<ApiResult>(url, data);
    }

    public cuentaBancariaCreate(data: any): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule;
        return this.http.post<ApiResult>(url, data);
    }

    public cuentaBancariaFindOne(ci: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + ci;
        return this.http.get<ApiResult>(url);
    }

    public cuentaBancariaFindAll(attribute: string, orderBy: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/all/' + attribute +'/' + orderBy;
        return this.http.get<ApiResult>(url);
    }


    public cuentaBancariaFindBy(attribute: string, value: string, orderBy: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/find-by/' + attribute + '/' + value + '/' + orderBy;
        return this.http.get<ApiResult>(url);
    }

    public cuentaBancariaUpdate(ci: string, data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + ci;
        return this.http.patch<ApiResult>(url, data);
    }

    public cuentaBancariaRemove(ci: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + ci;
        return this.http.delete<ApiResult>(url,);
    }

}