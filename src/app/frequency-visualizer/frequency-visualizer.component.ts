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
    //打印一些参数
    // console.log(bufferLength); 都是128
    let x = 0;
    // 好看的紫色
    let r = 255;//160
    let g = 215;//32
    let b = 0;//240
    // let rgb = 2
    // alert(bufferLength); 128个
    analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      const fillPercentage = dataArray[i] / 255;
      const barHeight = height * fillPercentage;

      //TODO 设置成彩色的频谱图 一种方法是在0到255之间 随机取一个整数
      // 全白色
      // const r = 255;
      // const g = 255;
      // const b = 255;

      // 每条颜色不同时间不一样 最乱
      // const r = Math.floor(Math.random() * 256);
      // const g = Math.floor(Math.random() * 256);
      // const b = Math.floor(Math.random() * 256);

      // 不同条的颜色不一样
      // if(r<0){
      //   r = 255;
      // }
      // else if(r>255)
      // {
      //   r = 0;
      // }
      // if(g<0){
      //   g = 255;
      // }
      // else if(g>255)
      // {
      //   g = 0;
      // }
      // if(b<0){
      //   b = 255;
      // }
      // else if(b>255)
      // {
      //   b = 0;
      // }
      r -= 2;
      g -= 2;
      b -= 2;


      ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
      ctx.fillRect(x + barSpan / 2, height - barHeight,
        barWidth, barHeight);
      x += barSpace;
    }
  }

}
