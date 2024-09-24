import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private defaultHeaders: HttpHeaders = new HttpHeaders({
    'Accept-Language': 'en-us',
  });

  constructor(private http: HttpClient) {}

  request<TRequest, TResponse>(options: {
    method: string;
    url: string;
    body?: TRequest;
    headers?: HttpHeaders;
    params?: HttpParams;
    withBodyProp?: boolean; //todo
  }): Observable<TResponse> {
    const { method, url, body, headers, params, withBodyProp } = options;
    const mergedHeaders = this.mergeHeaders(headers);
    const requestOptions = {
      headers: mergedHeaders,
      params,
    };

    let data = {};

    if (body !== undefined && withBodyProp) {
      data = { body: { ...body } };
    } else {
      data = { ...body };
    }

    if (params) {
      let httpParams = new HttpParams();
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
      requestOptions.params = httpParams;
    }

      switch (method.toLowerCase()) {
        case 'get':
          return this.http.get<TResponse>(url, requestOptions);
        case 'post':
          if (body instanceof FormData) {
            return this.http.post<TResponse>(url, body, requestOptions);
          }
          return this.http.post<TResponse>(url, data, requestOptions);
        case 'put':
          return this.http.put<TResponse>(url, data, requestOptions);
        case 'delete':
          return this.http.delete<TResponse>(url, requestOptions);
        case 'patch':
          return this.http.patch<TResponse>(url, data, requestOptions);
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
   
  }

  private mergeHeaders(customHeaders: HttpHeaders | undefined): HttpHeaders {
    let mergedHeaders = new HttpHeaders();

    this.defaultHeaders.keys().forEach((header) => {
      mergedHeaders = mergedHeaders.append(header, this.defaultHeaders.get(header)!);
    });

    if (customHeaders) {
      customHeaders.keys().forEach((header) => {
        mergedHeaders = mergedHeaders.set(header, customHeaders.get(header)!);
      });
    }

    return mergedHeaders;
  }
}
