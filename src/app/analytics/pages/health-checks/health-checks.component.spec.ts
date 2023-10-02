import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthChecksComponent } from './health-checks.component';

describe('HealthChecksComponent', () => {
  let component: HealthChecksComponent;
  let fixture: ComponentFixture<HealthChecksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthChecksComponent]
    });
    fixture = TestBed.createComponent(HealthChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
