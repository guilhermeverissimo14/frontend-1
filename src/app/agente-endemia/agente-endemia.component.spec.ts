import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenteEndemiaComponent } from './agente-endemia.component';

describe('AgenteEndemiaComponent', () => {
  let component: AgenteEndemiaComponent;
  let fixture: ComponentFixture<AgenteEndemiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenteEndemiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenteEndemiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
