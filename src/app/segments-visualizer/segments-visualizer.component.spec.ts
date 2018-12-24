import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentsVisualizerComponent } from './segments-visualizer.component';

describe('SegmentsVisualizerComponent', () => {
  let component: SegmentsVisualizerComponent;
  let fixture: ComponentFixture<SegmentsVisualizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentsVisualizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentsVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
