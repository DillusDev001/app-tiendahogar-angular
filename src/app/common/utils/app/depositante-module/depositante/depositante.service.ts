import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlBaseApi, versionApi } from "../../../server.utils";
import { ApiResult } from "../../../../interfaces/api.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DepositanteService {

    constructor(private http: HttpClient) { }

    urlBase: string = urlBaseApi;
    urlVersion: string = versionApi;
    urlModule: string = '/depositante';

    public depositanteCreateMultiple(data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/multiple';
        return this.http.post<ApiResult>(url, data);
    }

    public depositanteCreate(data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule;
        return this.http.post<ApiResult>(url, data);
    }

    public depositanteFindOne(ci: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + ci;
        return this.http.get<ApiResult>(url);
    }

    public depositanteFindAll(attribute: string, orderBy: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/all/' + attribute +'/' + orderBy;
        return this.http.get<ApiResult>(url);
    }


    public depositanteFindBy(attribute: string, value: string, orderBy: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/find-by/' + attribute + '/' + value + '/' + orderBy;
        return this.http.get<ApiResult>(url);
    }

    public depositanteUpdate(ci: string, data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + ci;
        return this.http.patch<ApiResult>(url, data);
    }

    public depositanteRemove(ci: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + ci;
        return this.http.delete<ApiResult>(url,);
    }  
}