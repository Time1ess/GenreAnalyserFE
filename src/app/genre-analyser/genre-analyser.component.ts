import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { GenreAnalyserService } from '../genre-analyser.service';

/* Root app for genre analyser. */
@Component({
  selector: 'app-genre-analyser',
  templateUrl: './genre-analyser.component.html',
  styleUrls: ['./genre-analyser.component.css']
})
export class GenreAnalyserComponent implements OnInit, AfterViewInit {

  @ViewChild('audioFile') audioFile?: ElementRef;
  @ViewChild('audioPlayer') audioPlayer?: ElementRef;

  constructor(private readonly analyserService: GenreAnalyserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Connect audio player to analyser.
    this.analyserService.connectPlayer(this.audioPlayer);
  }

  /* Change the source of the audio player. */
  audioChange() {
    const audioURL = URL.createObjectURL(this.audioFile.nativeElement.files[0]);
    const player = this.audioPlayer.nativeElement;
    player.src = audioURL;
    player.load();
    //获取音频文件的名字
    this.analyserService.audioName = this.audioFile.nativeElement.files[0].name;
    this.analyserService.audioChange.next();
  }
}
