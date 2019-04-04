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
        container: container,
        waveColor: 'white',
        progressColor: 'rgb(4, 44, 138)',
        minPxPerSec: 1,
        normalize: true,
        pixelRatio: 1,
        responsive: true,
        removeMediaElementOnDestroy: false,
      });
      this.waveSurfer.load(this.audioPlayer.nativeElement);
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
