import { Component, OnInit, signal } from '@angular/core';
import { ProjetService, Projet } from '../../core/services/projet.service';
import { AffectationService, Affectation } from '../../core/services/affectation.service';

@Component({
  selector: 'app-employes-projet',
  templateUrl: './employes-projet.component.html',
  styleUrls: ['./employes-projet.component.scss']
})
export class EmployesProjetComponent implements OnInit {
  projets = signal<Projet[]>([]);
  affectations = signal<Affectation[]>([]);
  selectedProjet = signal<number | null>(null);

  constructor(
    private projetService: ProjetService,
    private affectationService: AffectationService
  ) {}

  ngOnInit() { this.projetService.getAll().subscribe(d => this.projets.set(d)); }

  selectProjet(id: number) {
    this.selectedProjet.set(id);
    this.affectationService.getByProjet(id).subscribe(d => this.affectations.set(d));
  }

  getAvatarColor(nom: string): string {
    const colors = ['#3f51b5','#43a047','#f57c00','#7b1fa2','#e53935','#00838f','#558b2f'];
    return colors[nom.charCodeAt(0) % colors.length];
  }
}
