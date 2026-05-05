import { Component, OnInit, signal } from '@angular/core';
import { EmployeService, Employe } from '../../core/services/employe.service';
import { ProjetService, Projet } from '../../core/services/projet.service';
import { CategorieService } from '../../core/services/categorie.service';
import { AffectationService, Affectation } from '../../core/services/affectation.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employes = signal(0);
  projets = signal(0);
  categories = signal(0);
  affectations = signal(0);
  today = new Date();

  recentAffectations = signal<Affectation[]>([]);
  displayedColumns = ['employe', 'projet', 'dateDebut', 'dateFin', 'statut'];

  // Graphique barres — employés par catégorie
  barChartData = signal<ChartData<'bar'>>({ labels: [], datasets: [] });
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: true, text: 'Employés par catégorie' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  // Graphique camembert — rôles
  pieChartData = signal<ChartData<'pie'>>({ labels: [], datasets: [] });
  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Répartition des rôles' } }
  };

  // Graphique courbe — affectations par mois
  lineChartData = signal<ChartData<'line'>>({ labels: [], datasets: [] });
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: true, text: 'Affectations par mois' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  constructor(
    private employeService: EmployeService,
    private projetService: ProjetService,
    private categorieService: CategorieService,
    private affectationService: AffectationService
  ) {}

  ngOnInit() {
    this.categorieService.getAll().subscribe(cats => this.categories.set(cats.length));
    this.projetService.getAll().subscribe(p => this.projets.set(p.length));

    this.employeService.getAll().subscribe(employes => {
      this.employes.set(employes.length);
      this.buildBarChart(employes);
      this.buildPieChart(employes);
    });

    this.affectationService.getAll().subscribe(affs => {
      this.affectations.set(affs.length);
      this.recentAffectations.set(affs.slice(-5).reverse());
      this.buildLineChart(affs);
    });
  }

  buildBarChart(employes: Employe[]) {
    const map: { [key: string]: number } = {};
    employes.forEach(e => {
      const cat = e.categorie?.nom || 'Non défini';
      map[cat] = (map[cat] || 0) + 1;
    });
    this.barChartData.set({
      labels: Object.keys(map),
      datasets: [{
        data: Object.values(map),
        backgroundColor: ['#3f51b5', '#43a047', '#f57c00', '#7b1fa2', '#e53935'],
        borderRadius: 6
      }]
    });
  }

  buildPieChart(employes: Employe[]) {
    const admins = employes.filter(e => e.role === 'ADMIN').length;
    const emps = employes.filter(e => e.role === 'EMPLOYE').length;
    this.pieChartData.set({
      labels: ['Admins', 'Employés'],
      datasets: [{
        data: [admins, emps],
        backgroundColor: ['#3f51b5', '#43a047'],
        hoverOffset: 8
      }]
    });
  }

  buildLineChart(affs: Affectation[]) {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    const counts = new Array(12).fill(0);
    affs.forEach(a => {
      const month = new Date(a.dateDebut).getMonth();
      counts[month]++;
    });
    this.lineChartData.set({
      labels: months,
      datasets: [{
        data: counts,
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#3f51b5'
      }]
    });
  }

  getStatut(dateFin: string): { label: string; color: string } {
    const days = Math.ceil((new Date(dateFin).getTime() - new Date().getTime()) / 86400000);
    if (days < 0) return { label: 'Terminé', color: '#e53935' };
    if (days < 30) return { label: 'Urgent', color: '#f57c00' };
    return { label: 'En cours', color: '#43a047' };
  }
}
