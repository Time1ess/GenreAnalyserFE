import { TestBed } from '@angular/core/testing';

import { GenreAnalyserService } from './genre-analyser.service';

describe('GenreAnalyserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenreAnalyserService = TestBed.get(GenreAnalyserService);
    expect(service).toBeTruthy();
  });
});
