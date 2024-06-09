import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.interface';
import { AbstractService } from './abstract-service';
import { CategoryResponse } from '../models/category.response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService {

  constructor(http: HttpClient) { super(http);}

  getCategory(): Observable<CategoryResponse>{
    return this.http.get<CategoryResponse>(`${this.baseUrl}/api/categories`);
  }

  getCategorys(keyword: string) {
    return this.http.get(`${this.baseUrl}/api/categories?keyword=${keyword}`);
  }

  addCategory(category: Category): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/categories`, category);
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/categories/${id}/edit`);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/categories/${id}/delete`);
  }

  showCategory(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/categories/${id}`);
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/categories/${id}/update`, category);
  }

}
