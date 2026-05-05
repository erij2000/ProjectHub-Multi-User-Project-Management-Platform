import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService, Projet } from '../../core/services/projet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss']
})
export class ProjetsComponent implements OnInit {
  projets = signal<Projet[]>([]);
  form: FormGroup;
  editing = signal<Projet | null>(null);
  displayedColumns = ['nom', 'description', 'actions'];

  constructor(private fb: FormBuilder, private service: ProjetService, private snackBar: MatSnackBar) {
    this.form = this.fb.group({ nom: ['', Validators.required], description: [''] });
  }

  ngOnInit() { this.load(); }
  load() { this.service.getAll().subscribe(d => this.projets.set(d)); }

  edit(p: Projet) { this.editing.set(p); this.form.patchValue(p); }
  cancel() { this.editing.set(null); this.form.reset(); }

  submit() {
    if (this.form.invalid) return;
    const ed = this.editing();
    const obs = ed ? this.service.update(ed.id!, this.form.value) : this.service.create(this.form.value);
    obs.subscribe({ next: () => { this.snackBar.open('Sauvegardé !', '', { duration: 2000 }); this.cancel(); this.load(); } });
  }

  delete(id: number) {
    if (!confirm('Supprimer ce projet ?')) return;
    this.service.delete(id).subscribe(() => { this.snackBar.open('Supprimé', '', { duration: 2000 }); this.load(); });
  }
}
