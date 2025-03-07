import { TestBed } from '@angular/core/testing';

import { ElectrodomesticoService } from './electrodomestico.service';

describe('ElectrodomesticoService', () => {
  let service: ElectrodomesticoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectrodomesticoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
