import { Component, OnInit, signal } from '@angular/core';
import { AffectationService, Affectation } from '../../core/services/affectation.service';
import { AuthService } from '../../core/services/auth.service';
import { EmployeService } from '../../core/services/employe.service';

export interface Tache {
  id: string;
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrls: ['./mes-projets.component.scss']
})
export class MesProjetsComponent implements OnInit {
  affectations = signal<Affectation[]>([]);
  newTache: { [projetId: number]: string } = {};

  constructor(
    private affectationService: AffectationService,
    private authService: AuthService,
    private employeService: EmployeService
  ) {}

  ngOnInit() {
    const email = this.authService.currentUser()?.email;
    this.employeService.getAll().subscribe(employes => {
      const moi = employes.find(e => e.email === email);
      if (moi?.id) {
        this.affectationService.getByEmploye(moi.id).subscribe(d => this.affectations.set(d));
      }
    });
  }

  getStatut(dateFin: string): { label: string; color: string; icon: string } {
    const days = Math.ceil((new Date(dateFin).getTime() - new Date().getTime()) / 86400000);
    if (days < 0) return { label: 'Terminé', color: '#e53935', icon: 'check_circle' };
    if (days < 30) return { label: 'Urgent', color: '#f57c00', icon: 'pending' };
    return { label: 'Actif', color: '#43a047', icon: 'play_circle' };
  }

  getProgression(dateDebut: string, dateFin: string): number {
    const debut = new Date(dateDebut).getTime();
    const fin = new Date(dateFin).getTime();
    const now = new Date().getTime();
    return Math.min(100, Math.max(0, Math.round(((now - debut) / (fin - debut)) * 100)));
  }

  getTotalTaches(): number {
    return this.affectations().reduce((acc, a) => acc + this.getTaches(a.projet.id!).length, 0);
  }

  getTotalDone(): number {
    return this.affectations().reduce((acc, a) => acc + this.getTachesDone(a.projet.id!), 0);
  }

  getProgressionGlobale(): number {
    const total = this.getTotalTaches();
    return total === 0 ? 0 : Math.round((this.getTotalDone() / total) * 100);
  }

  getTaches(projetId: number): Tache[] {
    const raw = localStorage.getItem(`taches_${projetId}`);
    return raw ? JSON.parse(raw) : [];
  }

  saveTaches(projetId: number, taches: Tache[]) {
    localStorage.setItem(`taches_${projetId}`, JSON.stringify(taches));
  }

  addTache(projetId: number) {
    const label = this.newTache[projetId]?.trim();
    if (!label) return;
    const taches = this.getTaches(projetId);
    taches.push({ id: Date.now().toString(), label, done: false });
    this.saveTaches(projetId, taches);
    this.newTache[projetId] = '';
  }

  toggleTache(projetId: number, id: string) {
    const taches = this.getTaches(projetId).map(t => t.id === id ? { ...t, done: !t.done } : t);
    this.saveTaches(projetId, taches);
  }

  deleteTache(projetId: number, id: string) {
    this.saveTaches(projetId, this.getTaches(projetId).filter(t => t.id !== id));
  }

  getTachesDone(projetId: number): number {
    return this.getTaches(projetId).filter(t => t.done).length;
  }
}
