import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AffectationService, Affectation } from '../../core/services/affectation.service';
import { EmployeService, Employe } from '../../core/services/employe.service';
import { ProjetService, Projet } from '../../core/services/projet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.scss']
})
export class AffectationsComponent implements OnInit {
  affectations = signal<Affectation[]>([]);
  employes = signal<Employe[]>([]);
  projets = signal<Projet[]>([]);
  form: FormGroup;
  displayedColumns = ['employe', 'projet', 'dateDebut', 'dateFin', 'actions'];

  constructor(
    private fb: FormBuilder,
    private service: AffectationService,
    private employeService: EmployeService,
    private projetService: ProjetService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      employe: [null, Validators.required],
      projet: [null, Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.load();
    this.employeService.getAll().subscribe(d => this.employes.set(d));
    this.projetService.getAll().subscribe(d => this.projets.set(d));
  }

  load() { this.service.getAll().subscribe(d => this.affectations.set(d)); }

  submit() {
    if (this.form.invalid) return;
    const val = this.form.value;
    const payload: Affectation = {
      employe: { id: val.employe },
      projet: { id: val.projet },
      dateDebut: val.dateDebut,
      dateFin: val.dateFin
    };
    this.service.create(payload).subscribe({
      next: () => { this.snackBar.open('Affectation créée !', '', { duration: 2000 }); this.form.reset(); this.load(); },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cette affectation ?')) return;
    this.service.delete(id).subscribe(() => { this.snackBar.open('Supprimée', '', { duration: 2000 }); this.load(); });
  }
}
