import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbsEstadualComponent } from './ubs-estadual.component';

describe('UbsEstadualComponent', () => {
  let component: UbsEstadualComponent;
  let fixture: ComponentFixture<UbsEstadualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UbsEstadualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UbsEstadualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
