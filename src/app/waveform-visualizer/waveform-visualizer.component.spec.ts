import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveformVisualizerComponent } from './waveform-visualizer.component';

describe('WaveformVisualizerComponent', () => {
  let component: WaveformVisualizerComponent;
  let fixture: ComponentFixture<WaveformVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveformVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveformVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
