// order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {
  private apiUrl = 'localhost:8091/testkits'; // Update with your API endpoint URL

  constructor(private http: HttpClient) {}

  getTestKits(): Observable<any[]> {
   // const queryParams = new HttpParams({ fromObject: params });
    return this.http.get<any[]>(this.apiUrl);
  }
}
