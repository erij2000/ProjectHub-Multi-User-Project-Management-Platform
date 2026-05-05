import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Categorie {
  id?: number;
  nom: string;
}

@Injectable({ providedIn: 'root' })
export class CategorieService {
  private url = `${environment.apiUrl}/admin/categories`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<Categorie[]>(this.url); }
  create(c: Categorie) { return this.http.post<Categorie>(this.url, c); }
  update(id: number, c: Categorie) { return this.http.put<Categorie>(`${this.url}/${id}`, c); }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
