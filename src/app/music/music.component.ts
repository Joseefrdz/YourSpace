import { Component, ElementRef, OnInit } from '@angular/core';
import { listas,canciones, sonidos } from '../archivoMusic';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent implements OnInit {

  listas: canciones[] = listas;
  select!: FormGroup;
  choose: boolean = false ;
  song: any
  music: HTMLAudioElement = new Audio();
  songSRC: string='';
  play:boolean = false;
  pause:boolean = false;

  tecla: HTMLAudioElement = new Audio();
  sound: canciones = sonidos[2];

  constructor(private form: FormBuilder, private ref: ElementRef) {
    this.select = this.form.group({
      opcion: [''],
    });
  }

  ngOnInit(): void {
    this.select.get('opcion')?.valueChanges.subscribe(value =>{
      this.song = this.listas.find(item => item.playlist === value);
    });
    this.tecla.src = this.sound.playlist;
  }

  playSound(){
    this.tecla.play();
  }

  cambios(){
    this.tecla.play();
    this.choose =true
    const elementoHTML = this.ref.nativeElement.querySelector('.music');
    elementoHTML.style.color = 'rgb(0, 255, 255)';
    elementoHTML.style.textShadow = '0px 0px 3px rgb(0, 255, 255)';
    // var objectJSON = JSON.stringify(this.song);  // PARA ALMACENAR EL OBJETO ENTERO EN MEMORIA LOCAL
    // localStorage.setItem('cancion', objectJSON);
    localStorage.setItem('cancion', this.song.playlist);
  }

  playtest(){
    if(this.play === false){
      this.music.src = this.song.playlist;
      this.music.play();
      this.play = true;
      this.pause = false;
      
      setTimeout(() => {
        this.music.pause();
        this.play = false;
        this.pause = true;
      }, 10000);

    }else{
      this.music.pause();
      this.play = false;
      this.pause = true;
    }

  }
  pausetest(){
      this.music.pause();
      this.play = false;
      this.pause = true;
  }

}
