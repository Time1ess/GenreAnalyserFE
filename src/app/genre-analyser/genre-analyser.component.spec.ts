import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreAnalyserComponent } from './genre-analyser.component';

describe('GenreAnalyserComponent', () => {
  let component: GenreAnalyserComponent;
  let fixture: ComponentFixture<GenreAnalyserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreAnalyserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
