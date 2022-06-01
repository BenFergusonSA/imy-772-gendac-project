import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCvsComponent } from './view-cvs.component';

describe('ViewCvsComponent', () => {
  let component: ViewCvsComponent;
  let fixture: ComponentFixture<ViewCvsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCvsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCvsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
