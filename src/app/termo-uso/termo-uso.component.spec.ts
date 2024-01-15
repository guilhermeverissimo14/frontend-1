import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoUsoComponent } from './termo-uso.component';

describe('TermoUsoComponent', () => {
  let component: TermoUsoComponent;
  let fixture: ComponentFixture<TermoUsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoUsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermoUsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
