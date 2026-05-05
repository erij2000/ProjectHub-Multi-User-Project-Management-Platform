import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Employe {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'EMPLOYE';
  categorie?: { id: number; nom: string };
}

@Injectable({ providedIn: 'root' })
export class EmployeService {
  private url = `${environment.apiUrl}/admin/employes`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<Employe[]>(this.url); }
  getById(id: number) { return this.http.get<Employe>(`${this.url}/${id}`); }
  create(e: Employe) { return this.http.post<Employe>(this.url, e); }
  update(id: number, e: Employe) { return this.http.put<Employe>(`${this.url}/${id}`, e); }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
