import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteViewComponent } from './paciente-view.component';

describe('PacienteViewComponent', () => {
  let component: PacienteViewComponent;
  let fixture: ComponentFixture<PacienteViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacienteViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacienteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
