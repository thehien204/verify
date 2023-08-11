import {Observable} from 'rxjs';
import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest} from '@angular/common/http';
import {VERIFY_API_URL} from "@service-proxies/verify-service-proxies";

@Injectable()
export class OrdUploadDownloadServiceProxies {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(VERIFY_API_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  public getDownloadFileByLink(link: string): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'GET',
      link,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public getDownloadFile(apiDownloadUrl: string): Observable<HttpEvent<Blob>> {
    return this.http.request(new HttpRequest(
      'GET',
      `${this.baseUrl}${apiDownloadUrl}`,
      null,
      {
        reportProgress: true,
        responseType: 'blob'
      }));
  }

  public getDownloadFileByInput(body: any, apiDownloadUrl: string): Observable<HttpEvent<Blob>> {
    const content_ = JSON.stringify(body);

    let url_ = this.baseUrl + apiDownloadUrl;
    return this.http.request("post", url_, {
      body: content_,
      observe: "response",
      responseType: "blob",

      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    })
  }

  public handlerSubscribedDownloadFile(data: HttpEvent<Blob>, fileDownloadName: string) {
    switch (data.type) {
      case HttpEventType.Response:
        const downloadedFile = new Blob([data.body], {type: data.body.type});
        const a = document.createElement('a');
        a.setAttribute('style', 'display:none;');
        document.body.appendChild(a);
        a.download = fileDownloadName;
        a.href = URL.createObjectURL(downloadedFile);
        a.target = '_blank';
        a.click();
        document.body.removeChild(a);
        break;
    }
  }

  public createFileDownloadNameWithTimeStamp(name: string, extension: string) {
    const now = new Date();
    const datestring = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear() + ' ' + now.getHours() + '_' + now.getMinutes() + '_' + now.getSeconds();
    return name + ' ' + datestring + extension;
  }
}
