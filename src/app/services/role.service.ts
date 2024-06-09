import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';
import { RoleResponse } from '../models/role.response';
import { Observable } from 'rxjs';
import { Role } from '../models/role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends AbstractService {

  constructor(http: HttpClient) { super(http);}

  getRole(): Observable<RoleResponse>{
    return this.http.get<RoleResponse>(`${this.baseUrl}/api/roles`);
  }

  getRoles(keyword: string) {
    return this.http.get(`${this.baseUrl}/api/roles?keyword=${keyword}`);
  }

  addRole(role: Role): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/roles`, role)
  }

  getRoleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/roles/${id}/edit`)
  }

  showRole(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/roles/${id}`);
  }

  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/roles/${id}/delete`);
  }

  getPermissions(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/permissions`);
  }

  updateRole(id: number, role: Role): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/roles/${id}/update`, role);
  }
}
