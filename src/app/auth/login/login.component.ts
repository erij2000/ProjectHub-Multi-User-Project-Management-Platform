import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading = signal(false);
  hidePassword = signal(true);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        this.authService.saveUser(res);
        this.snackBar.open('Connexion réussie !', '', { duration: 2000 });
        if (res.role === 'ADMIN') this.router.navigate(['/admin/dashboard']);
        else this.router.navigate(['/employe/mes-projets']);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Email ou mot de passe incorrect', 'Fermer', { duration: 3000 });
      }
    });
  }
}
