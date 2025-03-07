import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectrodomesticoComponent } from './electrodomestico.component';

describe('ElectrodomesticoComponent', () => {
  let component: ElectrodomesticoComponent;
  let fixture: ComponentFixture<ElectrodomesticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElectrodomesticoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectrodomesticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
