import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { urlBaseApi, versionApi } from "../../../server.utils";
import { ApiResult } from "../../../../interfaces/api.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    urlBase: string = urlBaseApi;
    urlVersion: string = versionApi;
    urlModule: string = '/auth';

    public authCreateMultiple(data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/multiple';
        return this.http.post<ApiResult>(url, data);
    }

    public authCreate(data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule;
        return this.http.post<ApiResult>(url, data);
    }

    public authFindOne(usuario: string, password: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + usuario + '/' + password;
        return this.http.get<ApiResult>(url);

    }

    public authUpdate(usuario: string, data: any[]): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + usuario;
        return this.http.patch<ApiResult>(url, data);
    }

    public authRemove(usuario: string): Observable<ApiResult> {
        const url = this.urlBase + this.urlVersion + this.urlModule + '/' + usuario;
        return this.http.delete<ApiResult>(url,);
    }

}