import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployesComponent } from './employes/employes.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProjetsComponent } from './projets/projets.component';
import { AffectationsComponent } from './affectations/affectations.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employes', component: EmployesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'projets', component: ProjetsComponent },
      { path: 'affectations', component: AffectationsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    EmployesComponent,
    CategoriesComponent,
    ProjetsComponent,
    AffectationsComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class AdminModule { }
