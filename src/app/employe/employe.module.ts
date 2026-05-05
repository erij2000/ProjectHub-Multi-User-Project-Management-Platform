import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MesProjetsComponent } from './mes-projets/mes-projets.component';
import { EmployesProjetComponent } from './employes-projet/employes-projet.component';
import { EmployeLayoutComponent } from './employe-layout/employe-layout.component';

const routes: Routes = [
  {
    path: '', component: EmployeLayoutComponent,
    children: [
      { path: 'mes-projets', component: MesProjetsComponent },
      { path: 'employes-projet', component: EmployesProjetComponent },
      { path: '', redirectTo: 'mes-projets', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [EmployeLayoutComponent, MesProjetsComponent, EmployesProjetComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class EmployeModule { }
