import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredictionVisualizerComponent } from './prediction-visualizer.component';

describe('PredictionVisualizerComponent', () => {
  let component: PredictionVisualizerComponent;
  let fixture: ComponentFixture<PredictionVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictionVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredictionVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
