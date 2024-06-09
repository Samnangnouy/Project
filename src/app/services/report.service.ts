import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends AbstractService{

  constructor(http: HttpClient) { super(http);}

  getProject(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/Reportproject`);
  }

  getFeature(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/Reportfeature`);
  }
}
