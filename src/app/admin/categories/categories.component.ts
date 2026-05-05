import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategorieService, Categorie } from '../../core/services/categorie.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories = signal<Categorie[]>([]);
  form: FormGroup;
  editing = signal<Categorie | null>(null);
  displayedColumns = ['id', 'nom', 'actions'];

  constructor(
    private fb: FormBuilder,
    private service: CategorieService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({ nom: ['', Validators.required] });
  }

  ngOnInit() { this.load(); }

  load() { this.service.getAll().subscribe(d => this.categories.set(d)); }

  edit(c: Categorie) {
    this.editing.set(c);
    this.form.patchValue({ nom: c.nom });
  }

  cancel() { this.editing.set(null); this.form.reset(); }

  submit() {
    if (this.form.invalid) return;
    const val = this.form.value;
    const ed = this.editing();
    const obs = ed ? this.service.update(ed.id!, val) : this.service.create(val);
    obs.subscribe({
      next: () => {
        this.snackBar.open(ed ? 'Catégorie modifiée' : 'Catégorie ajoutée', '', { duration: 2000 });
        this.cancel(); this.load();
      },
      error: () => this.snackBar.open('Erreur', 'Fermer', { duration: 3000 })
    });
  }

  delete(id: number) {
    if (!confirm('Supprimer cette catégorie ?')) return;
    this.service.delete(id).subscribe(() => { this.snackBar.open('Supprimée', '', { duration: 2000 }); this.load(); });
  }
}
