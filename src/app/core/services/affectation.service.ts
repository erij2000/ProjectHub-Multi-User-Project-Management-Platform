import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface Affectation {
  id?: number;
  employe: { id: number; nom?: string; prenom?: string };
  projet: { id: number; nom?: string };
  dateDebut: string;
  dateFin: string;
}

@Injectable({ providedIn: 'root' })
export class AffectationService {
  private url = `${environment.apiUrl}/admin/affectations`;
  constructor(private http: HttpClient) {}
  getAll() { return this.http.get<Affectation[]>(this.url); }
  getByProjet(id: number) { return this.http.get<Affectation[]>(`${this.url}/projet/${id}`); }
  getByEmploye(id: number) { return this.http.get<Affectation[]>(`${this.url}/employe/${id}`); }
  create(a: Affectation) { return this.http.post<Affectation>(this.url, a); }
  delete(id: number) { return this.http.delete(`${this.url}/${id}`); }
}
