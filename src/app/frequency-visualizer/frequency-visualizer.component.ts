import { NgZone, Component, ElementRef, OnInit, AfterViewInit, OnDestroy, ViewChild} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';

import { GenreAnalyserService } from '../genre-analyser.service';
import { resizeElement } from '../utils';

/* Visualize frequency bins of audio on canvas. */
@Component({
  selector: 'app-frequency-visualizer',
  templateUrl: './frequency-visualizer.component.html',
  styleUrls: ['./frequency-visualizer.component.css']
})
export class FrequencyVisualizerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas?: ElementRef;
  private destroy = new Subject<void>();
  analyserReadySub?: Subscription;

  ctx?: CanvasRenderingContext2D;

  constructor(private readonly analyserService: GenreAnalyserService,
    public ngZone: NgZone) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  onResize() {
    resizeElement(this.canvas);
  }

  ngAfterViewInit() {
    this.onResize();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // Begin to render frames after analyser ready.
    this.analyserReadySub = this.analyserService.analyserReady.pipe(
      takeUntil(this.destroy), first()).subscribe(() => {
        this.ngZone.runOutsideAngular(() => {
          requestAnimationFrame(this.renderFrame.bind(this));
        });
      });
  }


  /* Render frequency bins on canvas. */
  renderFrame() {
    requestAnimationFrame(this.renderFrame.bind(this));

    const canvas = this.canvas.nativeElement;
    const analyser = this.analyserService.analyser;
    const ctx = this.ctx;
    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barSpace = canvas.width / bufferLength;
    const barWidth = barSpace * 0.75;
    const barSpan = barSpace - barWidth;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);

    let x = 0;
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      const fillPercentage = dataArray[i] / 255;
      const barHeight = height * fillPercentage;

      const r = 255;
      const g = 255;
      const b = 255;

      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(x + barSpan / 2, height - barHeight,
        barWidth, barHeight);
      x += barSpace;
    }
  }

}
