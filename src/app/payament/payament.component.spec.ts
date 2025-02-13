import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayamentComponent } from './payament.component';

describe('PayamentComponent', () => {
  let component: PayamentComponent;
  let fixture: ComponentFixture<PayamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
