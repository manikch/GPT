// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestKit } from './testkit.model';

@Injectable()
export class OrderService {
  private apiUrl = 'http://localhost:8091/testkits'; // Update with your API endpoint URL

  private authUrl = 'http://localhost:9092/auth/google/generatedtoken'; // Update with your API endpoint URL

  constructor(private http: HttpClient) {console.log("order service");
}

createTestKit(testKit: TestKit): Observable<TestKit> {
  return this.http.post<TestKit>(this.apiUrl, testKit);
}
getTestKitById(id: string): Observable<TestKit> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<TestKit>(url);
}
getTestKits(sortBy: string): Observable<any[]> {
  const params = { sortBy };

  return this.http.get<TestKit[]>(this.apiUrl, { params });
}
updateTestKit(id: number, updatedTestKit: TestKit): Observable<TestKit> {
  const url = `${this.apiUrl}/${id}`;
  console.log(updatedTestKit.availability+updatedTestKit.brand.name+updatedTestKit.category.name+updatedTestKit.id+updatedTestKit.name+updatedTestKit.popularity+updatedTestKit.releaseDate );
  return this.http.put<TestKit>(url, updatedTestKit);
}
deleteTestKit(id: number) {
  const url = `${this.apiUrl}/${id}`;

  return this.http.delete(url);
}


//addToCart(id: number): Observable<any> {
//  const url = `${this.apiUrl}/${id}`;
//  return this.http.get(url);
//}
}
