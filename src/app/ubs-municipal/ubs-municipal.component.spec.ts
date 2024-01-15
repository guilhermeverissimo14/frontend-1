import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbsMunicipalComponent } from './ubs-municipal.component';

describe('UbsMunicipalComponent', () => {
  let component: UbsMunicipalComponent;
  let fixture: ComponentFixture<UbsMunicipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbsMunicipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbsMunicipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
