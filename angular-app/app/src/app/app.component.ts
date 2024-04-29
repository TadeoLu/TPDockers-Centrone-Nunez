import { Component, OnInit } from '@angular/core';
import { ArtistaComponent } from './artista/artista.component';
import { EntradaComponent } from './entrada/entrada.component';
import { FestivalComponent } from './festival/festival.component';
import { FestivalService } from './festival/festival.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IFestival } from './festival/festival.interface';
import { FormsModule } from '@angular/forms';
import { Genero } from './Genero';
import { IEntrada, Tipo } from './entrada/entrada.interface';
import { IArtista } from './artista/artista.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ArtistaComponent,
    EntradaComponent,
    FestivalComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  festivales: IFestival[] = [];
  nuevoFestival: IFestival = {
    id: 0,
    nombre: '',
    ubicacion: '',
    fechaInicio: new Date(),
    fechaFin: new Date(),
    artistas: [],
    entradas: [],
    capacidadMaxima: 0,
    tipoDeMusica: 0,
  };
  nuevoArtista: IArtista = {
    id: 0,
    nombre: '',
    apellido: '',
    edad: 0,
    genero: Genero.Reggeaton,
  };
  nuevaEntrada: IEntrada = {
    id: 0,
    precio: 0,
    tipo: Tipo.ExpNormal,
  };

  generos = Object.keys(Genero).filter(
    (key: any) => !isNaN(Number(Genero[key]))
  );

  tipos = Object.keys(Tipo).filter((key: any) => !isNaN(Number(Tipo[key])));

  mostrarFestivales: boolean = false;

  constructor(private festivalService: FestivalService) {}

  ngOnInit(): void {
    this.festivalService.getFestival().subscribe((f: any) => {
      this.festivales = f.festivales;
    });
  }

  agregarFestival(): void {
    this.festivalService.postFestival(this.nuevoFestival).subscribe(
      () => {
        this.festivales.push(this.nuevoFestival);
        this.nuevoFestival = {
          id: 0,
          nombre: '',
          ubicacion: '',
          fechaInicio: new Date(),
          fechaFin: new Date(),
          artistas: [],
          entradas: [],
          capacidadMaxima: 0,
          tipoDeMusica: 0,
        };
      },
      (respuesta) => {
        console.log('Respuesta del servidor:', respuesta);
      }
    );
  }

  agregarArtista(): void {
    this.nuevoFestival.artistas.push(this.nuevoArtista);
    this.nuevoArtista = {
      id: 0,
      nombre: '',
      apellido: '',
      edad: 0,
      genero: Genero.Reggeaton,
    };
  }

  agregarEntrada(): void {
    this.nuevoFestival.entradas.push(this.nuevaEntrada);
    this.nuevaEntrada = {
      id: 0,
      precio: 0,
      tipo: Tipo.ExpNormal,
    };
  }

  actualizarFestivales(nuevosFestivales: IFestival[]): void {
    this.festivales = nuevosFestivales;
  }
}
