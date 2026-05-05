import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employe-layout',
  templateUrl: './employe-layout.component.html',
  styleUrls: ['./employe-layout.component.scss']
})
export class EmployeLayoutComponent {
  constructor(public authService: AuthService) {}
  navItems = [
    { label: 'Mes Projets', icon: 'folder', route: '/employe/mes-projets' },
    { label: 'Employés par projet', icon: 'people', route: '/employe/employes-projet' },
  ];
}
