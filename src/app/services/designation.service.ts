import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DesignationResponse } from '../models/designation.response';
import { Observable } from 'rxjs';
import { Designation } from '../models/designation.interface';
import { AbstractService } from './abstract-service';

@Injectable({
  providedIn: 'root'
})
export class DesignationService extends AbstractService {

  constructor(http: HttpClient) { super(http);}

  getDesignation(): Observable<DesignationResponse>{
    return this.http.get<DesignationResponse>(`${this.baseUrl}/api/designations`);
  }

  getDesignations(keyword: string) {
    return this.http.get(`${this.baseUrl}/api/designations?keyword=${keyword}`);
  }

  addDesignation(designation: Designation): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/designations`, designation);
  }

  getDesignationById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/designations/${id}/edit`);
  }

  deleteDesignation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/designations/${id}/delete`);
  }

  showDesignation(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/designations/${id}`);
  }

  updateDesignation(id: number, designation: Designation): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/designations/${id}/update`, designation);
  }

  getDesignationsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/designations?category_id=${categoryId}`);
  }
}
