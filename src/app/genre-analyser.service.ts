import { ElementRef, Injectable } from '@angular/core';
import { ReplaySubject, timer } from 'rxjs';

import * as WaveSurfer from 'wavesurfer.js';

const fftSize = 256;

/* Genreate context information of the audio from connected audio player. */
@Injectable({
  providedIn: 'root'
})
export class GenreAnalyserService {
  audioCtx = new AudioContext();
  // AudioContext接口表示由音频模块连接而成的音频处理图，
  // 每个模块对应一个AudioNode。AudioContext可以控制它所包含的节点的创建，
  // 以及音频处理、解码操作的执行。做任何事情之前都要先创建AudioContext对象，因为一切都发生在这个环境之中。
  analyser?: AnalyserNode;
  analyserReady = new ReplaySubject<void>();

  audioName = '';
  audioPlayer?: ElementRef;
  audioChange = new ReplaySubject<void>();

  waveSurfer?: WaveSurfer;
  waveSurferChange = new ReplaySubject<void>();
  waveform: string;

  constructor() { 
    // Initialize WaveSurfer after audio been selected.
  }

  /* Generate new WaveSurfer instance and draw waveform in container. */
  generateNewWaveSurfer(container: string) {
    if (!this.audioPlayer) throw new Error('No Audio player.');
    if (this.waveSurfer) this.waveSurfer.destroy();
    requestAnimationFrame(() => {
      this.waveSurfer = WaveSurfer.create({
        audioContext: this.audioCtx,
        backend: 'MediaElement',
        // WebAudio或MediaElement。在大多数情况下，您不必手动设置。
        // MediaElement是不受支持的浏览器的后备。
        container: container,
        // container: #wave
        //可以是唯一css3选择器 也可以是dom元素

        //TODO 下面两个颜色需要修改 觉得有点不好看
        //https://wenku.baidu.com/view/5f5bcdd233d4b14e852468d6.html
        // 颜色相关资料从这里看
        waveColor: 'cyan',
        // waveColor: 'white',
        progressColor: 'royalblue',

        // progressColor: 'rgb(4, 44, 138)',
        minPxPerSec: 1,//每秒音频的最小像素数。
        normalize: true,//通过最大峰值 而不是1.0标准化
        pixelRatio: 1,//可以设置1为更快的渲染。
        responsive: true,
        // 如果设置为true调整波形大小，则调整窗口大小。默认情况下，
        // 这会在100ms超时时被去抖。如果此参数是数字，则表示超时。
        removeMediaElementOnDestroy: false,
        // 设置为false在播放器被销毁时将媒体元素保留在DOM中。
        // 当通过该loadMediaElement方法重用现有媒体元素时，这很有用。
      });
      this.waveSurfer.load(this.audioPlayer.nativeElement);
      //加载音频
      this.waveSurferChange.next();
      this.waveSurfer.on('waveform-ready', () => {
        this.waveSurfer.play();
        timer(1000).subscribe(() => {
          this.waveform = this.waveSurfer.exportImage();
          console.log(this.waveform);
        });
      });
    });
  }

  /* Connect audio player and audio context analyser. */
  connectPlayer(player: ElementRef) {
    this.audioPlayer = player;
    const source = this.audioCtx.createMediaElementSource(player.nativeElement);
    this.analyser = this.audioCtx.createAnalyser();
    source.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);
    this.analyser.fftSize = fftSize;
    this.analyserReady.next();
  }
}
