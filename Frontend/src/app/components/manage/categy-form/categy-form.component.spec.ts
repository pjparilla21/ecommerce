import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategyFormComponent } from './categy-form.component';

describe('CategyFormComponent', () => {
  let component: CategyFormComponent;
  let fixture: ComponentFixture<CategyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategyFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
