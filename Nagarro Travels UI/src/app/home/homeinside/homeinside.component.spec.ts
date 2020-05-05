import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinsideComponent } from './homeinside.component';

describe('HomeinsideComponent', () => {
  let component: HomeinsideComponent;
  let fixture: ComponentFixture<HomeinsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeinsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeinsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
