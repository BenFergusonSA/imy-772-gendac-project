import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSingleCvComponent } from './upload-single-cv.component';

describe('UploadSingleCvComponent', () => {
  let component: UploadSingleCvComponent;
  let fixture: ComponentFixture<UploadSingleCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSingleCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSingleCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
