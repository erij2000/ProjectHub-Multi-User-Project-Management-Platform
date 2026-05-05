import { Component, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(public authService: AuthService) {}

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/admin/dashboard' },
    { label: 'Employés', icon: 'people', route: '/admin/employes' },
    { label: 'Catégories', icon: 'category', route: '/admin/categories' },
    { label: 'Projets', icon: 'folder', route: '/admin/projets' },
    { label: 'Affectations', icon: 'assignment', route: '/admin/affectations' },
  ];
}
