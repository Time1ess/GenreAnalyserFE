import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyVisualizerComponent } from './frequency-visualizer.component';

describe('FrequencyVisualizerComponent', () => {
  let component: FrequencyVisualizerComponent;
  let fixture: ComponentFixture<FrequencyVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrequencyVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencyVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
