import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Projet {
  id?: number;
  nom: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class ProjetService {
  private url = `${environment.apiUrl}/projets`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<Projet[]>(this.url); }
  create(p: Projet) { return this.http.post<Projet>(this.url, p); }
  update(id: number, p: Projet) { return this.http.put<Projet>(`${this.url}/${id}`, p); }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
