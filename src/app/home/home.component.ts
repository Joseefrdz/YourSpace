import { Component, OnInit } from '@angular/core';
import { canciones, sonidos } from '../archivoMusic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  newWindow = 'https://joseefrdz.github.io/YourSpace/componente';

  win: HTMLAudioElement = new Audio();
  light: HTMLAudioElement = new Audio();
  sound: canciones = sonidos[1];
  luz: canciones = sonidos[3];

  ngOnInit(): void {
    this.win.src = this.sound.playlist;
    this.light.src = this.luz.playlist;
  }

  playsound(){
    this.light.play();
  }
  stopsound(){
    this.light.pause();
  }
  // para crear la ventana
  ventana() {
    // Opciones para la ventana
    const opcionesVentana = 'width=600px, height=400px, resizable=no, scrollbars=no, status=no ,toolbar=no, location=no, fullscreen=no,';
    const ventana = window.open(this.newWindow, 'Tu Ventana', opcionesVentana)
    this.win.play();
    if (ventana) {
      ventana.document.body.style.overflow = 'hidden';
      ventana.addEventListener('resize', () => {
        ventana.resizeTo(600, 400);
      });

    }
  }

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

