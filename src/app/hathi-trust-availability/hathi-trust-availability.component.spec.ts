import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HathiTrustAvailabilityComponent } from './hathi-trust-availability.component';

describe('HathiTrustAvailabilityComponent', () => {
  let component: HathiTrustAvailabilityComponent;
  let fixture: ComponentFixture<HathiTrustAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HathiTrustAvailabilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HathiTrustAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
