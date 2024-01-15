import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbsEstadualFormComponent } from './ubs-estadual-form.component';

describe('UbsEstadualFormComponent', () => {
  let component: UbsEstadualFormComponent;
  let fixture: ComponentFixture<UbsEstadualFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbsEstadualFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbsEstadualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
