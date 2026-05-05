import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const MATERIAL = [
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatTableModule, MatIconModule, MatToolbarModule, MatSidenavModule,
  MatListModule, MatDialogModule, MatSnackBarModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule,
  MatTooltipModule, MatChipsModule, MatBadgeModule, MatMenuModule,
  MatDividerModule, MatPaginatorModule, MatSortModule,
  MatCheckboxModule, MatProgressBarModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, NgChartsModule, ...MATERIAL],
  exports: [CommonModule, ReactiveFormsModule, FormsModule, NgChartsModule, ...MATERIAL]
})
export class SharedModule { }
