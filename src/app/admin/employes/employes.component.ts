import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService, Employe } from '../../core/services/employe.service';
import { CategorieService, Categorie } from '../../core/services/categorie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {
  employes = signal<Employe[]>([]);
  categories = signal<Categorie[]>([]);
  form: FormGroup;
  editing = signal<Employe | null>(null);
  displayedColumns = ['nom', 'email', 'categorie', 'role', 'actions'];

  constructor(
    private fb: FormBuilder,
    private service: EmployeService,
    private categorieService: CategorieService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['EMPLOYE', Validators.required],
      categorie: [null]
    });
  }

  ngOnInit() { this.load(); this.categorieService.getAll().subscribe(d => this.categories.set(d)); }

  load() { this.service.getAll().subscribe(d => this.employes.set(d)); }

  edit(e: Employe) {
    this.editing.set(e);
    this.form.patchValue({ nom: e.nom, prenom: e.prenom, email: e.email, role: e.role, categorie: e.categorie?.id });
  }

  cancel() { this.editing.set(null); this.form.reset({ role: 'EMPLOYE' }); }

  submit() {
    if (this.form.invalid) return;
    const val = this.form.value;
    const payload: any = { ...val, categorie: val.categorie ? { id: val.categorie } : null };
    const ed = this.editing();
    const obs = ed ? this.service.update(ed.id!, payload) : this.service.create(payload);
    obs.subscribe({
      next: () => { this.snackBar.open('Sauvegardé !', '', { duration: 2000 }); this.cancel(); this.load(); },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cet employé ?')) return;
    this.service.delete(id).subscribe(() => { this.snackBar.open('Supprimé', '', { duration: 2000 }); this.load(); });
  }
}
