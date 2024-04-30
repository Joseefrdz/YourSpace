import { Component, OnInit } from '@angular/core';
import { imagen, paisajes, fondos, personajes, extras } from '../archivoImg';
import { canciones, sonidos } from '../archivoMusic';


@Component({
  selector: 'app-btns',
  templateUrl: './btns.component.html',
  styleUrl: './btns.component.css'
})
export class BtnsComponent implements OnInit {

  pulsado: boolean = false;
  tipo: string = '';
  imagenes: imagen[] = [];
  
  sonido: canciones = sonidos[2];
  sound: HTMLAudioElement = new Audio();


  ngOnInit(): void {
    this.sound.src = this.sonido.playlist;
  }

  cerrar(){
    this.pulsado = false;
    this.sound.play();
  }

  //FUNCIONALIDAD BOTONES
  paisaje(){
    this.pulsado = true;
    this.tipo = 'paisaje';
    this.imagenes = paisajes;
    this.sound.play();
  }
  fondo(){
    this.pulsado = true;
    this.tipo = 'fondo';
    this.imagenes = fondos;
    this.sound.play();
  }
  person(){
    this.pulsado = true;
    this.tipo = 'person'; 
    this.imagenes = personajes;
    this.sound.play();
  }
  extra(){
    this.pulsado = true;
    this.tipo = 'extra'; 
    this.imagenes = extras;
    this.sound.play();
  }

  //DRAG AND DROP

  onDragStart(event: DragEvent) {
    if (event.target instanceof HTMLImageElement) {
      if((event.target as HTMLImageElement).className === 'fondo'){

        const imageUrl = (event.target as HTMLImageElement).src;
        localStorage.setItem('imgFondo', imageUrl);

      }else if((event.target as HTMLImageElement).className === 'person'){

        const imageUrl = (event.target as HTMLImageElement).src;
        localStorage.setItem('imgPerson', imageUrl);

      }else if((event.target as HTMLImageElement).className === 'extra'){

        const imageUrl = (event.target as HTMLImageElement).src;
        localStorage.setItem('imgExtra', imageUrl);

      }else if((event.target as HTMLImageElement).className === 'paisaje'){

        const imageUrl = (event.target as HTMLImageElement).src;
        localStorage.setItem('imgPaisaje', imageUrl);
      }
    }
  }

}
