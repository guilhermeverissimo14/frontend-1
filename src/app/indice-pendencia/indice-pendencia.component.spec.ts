import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicePendenciaComponent } from './indice-pendencia.component';

describe('IndicePendenciaComponent', () => {
  let component: IndicePendenciaComponent;
  let fixture: ComponentFixture<IndicePendenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicePendenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicePendenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
