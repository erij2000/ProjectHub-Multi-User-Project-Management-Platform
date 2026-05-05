import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployesProjetComponent } from './employes-projet.component';

describe('EmployesProjetComponent', () => {
  let component: EmployesProjetComponent;
  let fixture: ComponentFixture<EmployesProjetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployesProjetComponent]
    });
    fixture = TestBed.createComponent(EmployesProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
