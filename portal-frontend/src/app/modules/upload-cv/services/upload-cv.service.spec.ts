import { TestBed } from '@angular/core/testing';

import { UploadCvService } from './upload-cv.service';

describe('UploadCvService', () => {
  let service: UploadCvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadCvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
