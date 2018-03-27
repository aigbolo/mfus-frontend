import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { M000402AnnouncementInterwivweeDetailComponent } from './m000402-announcement-interwivwee-detail.component';

describe('M000402AnnouncementInterwivweeDetailComponent', () => {
  let component: M000402AnnouncementInterwivweeDetailComponent;
  let fixture: ComponentFixture<M000402AnnouncementInterwivweeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ M000402AnnouncementInterwivweeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(M000402AnnouncementInterwivweeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
