import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbsMunicipalFormComponent } from './ubs-municipal-form.component';

describe('UbsMunicipalFormComponent', () => {
  let component: UbsMunicipalFormComponent;
  let fixture: ComponentFixture<UbsMunicipalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbsMunicipalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbsMunicipalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
