import { Component, Input, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GenreAnalyserService } from '../genre-analyser.service';


/* Visualize waveform of audio and provide control buttons to it. */
@Component({
  selector: 'app-waveform-visualizer',
  templateUrl: './waveform-visualizer.component.html',
  styleUrls: ['./waveform-visualizer.component.css']
})
export class WaveformVisualizerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('waveformDiv') waveformDiv?: ElementRef;

  private destroy = new Subject<void>();
  audioChangeSub?: Subscription;

  constructor(readonly analyserService: GenreAnalyserService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  ngAfterViewInit() {
    this.audioChangeSub = this.analyserService.audioChange.pipe(
      takeUntil(this.destroy)).subscribe(() => {
        this.waveformDiv.nativeElement.innerHTML = '';
        this.analyserService.generateNewWaveSurfer('#waveformDiv');
      });
  }
}
