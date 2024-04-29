import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Input } from '@angular/core';
import { FestivalComponent } from './festival.component';

describe('FestivalComponent', () => {
  let component: FestivalComponent;
  let fixture: ComponentFixture<FestivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FestivalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FestivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
