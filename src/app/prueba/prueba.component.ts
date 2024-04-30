import { Component, HostListener, OnDestroy, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { canciones, sonidos } from '../archivoMusic';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.css'
})

export class PruebaComponent implements OnInit, OnDestroy {


  imgPer: string | null = null;
  imgFo: string | null = null;
  imgEx: string | null = null;
  imgPa: string | null = null;

  alerta: HTMLAudioElement = new Audio();
  sound: canciones = sonidos[0];
  
  music: HTMLAudioElement = new Audio();
  songSrc: string | null = localStorage.getItem('cancion');;
  play: boolean = false;
  pause: boolean = false;
  volume: number = 50;
  volum:number = 0;

  private alert = inject(MatSnackBar);
  playAlert(){
    this.alerta.play();
    this.alert.open('Need to select a song','', {duration: 2000});
  }
  Volum(){
    this.volum = this.volume / 100;
    this.music.volume = this.volum;
  }
  playTest(){
    this.songSrc = localStorage.getItem('cancion');
    if(this.songSrc != null){
      this.music.src = this.songSrc;

      if(this.play === false){
        this.music.play();
        this.play = true;
        this.pause = false;  
      }else{
        this.music.pause();
        this.play = false;
        this.pause = true;
      }
    }else{
      this.playAlert();
    }
  }
  pauseTest(){
    this.music.pause();
    this.play = false;
    this.pause = true;
  }
  
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload($event: Event) {
      localStorage.removeItem('cancion');
  }

   // Permitir soltar la imagen

  @HostListener('document:drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    // Obtener la URL de la imagen desde los datos de transferencia
    // const imageUrl = localStorage.getItem('imgPerson');
    if (localStorage.getItem('imgPerson')) {

      this.imgPer = localStorage.getItem('imgPerson');
      // console.log('se ha soltado la imagen Person');
      localStorage.removeItem('imgPerson');

    } else if (localStorage.getItem('imgFondo')) {

      this.imgFo = localStorage.getItem('imgFondo');
      // console.log('se ha soltado la imagen Fondo');
      localStorage.removeItem('imgFondo');

    } else if (localStorage.getItem('imgExtra')) {

      this.imgEx = localStorage.getItem('imgExtra');
      // console.log('se ha soltado la imagen Extra');
      localStorage.removeItem('imgExtra');

    } else if (localStorage.getItem('imgPaisaje')) {

      this.imgPa = localStorage.getItem('imgPaisaje');
      // console.log('se ha soltado la imagen Paisaje');
      localStorage.removeItem('imgPaisaje');

    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevenir el comportamiento por defecto
    // Esto indica que el elemento es una zona válida para soltar el elemento arrastrado
    event.dataTransfer!.dropEffect = 'copy';
  }

  ngOnInit(): void {
    // Agregar un evento de redimensionamiento a la ventana
    window.addEventListener('resize', this.prevenirRedimensionamiento);
    this.alerta.src = this.sound.playlist;
  }

  ngOnDestroy(): void {
    // Eliminar el evento de redimensionamiento cuando el componente se destruye
    window.removeEventListener('resize', this.prevenirRedimensionamiento);
  }

  prevenirRedimensionamiento(): void {
    // Restablecer el tamaño de la ventana
    window.resizeTo(600, 400); // Establece el tamaño deseado de la ventana
  }

}
