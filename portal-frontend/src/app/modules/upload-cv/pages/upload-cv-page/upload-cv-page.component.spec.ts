import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCvPageComponent } from './upload-cv-page.component';

describe('UploadCvPageComponent', () => {
  let component: UploadCvPageComponent;
  let fixture: ComponentFixture<UploadCvPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCvPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCvPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
