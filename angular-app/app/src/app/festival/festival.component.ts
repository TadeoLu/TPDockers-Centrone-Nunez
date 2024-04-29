import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFestival } from './festival.interface';
import { ArtistaComponent } from '../artista/artista.component';
import { EntradaComponent } from '../entrada/entrada.component';
import { CommonModule } from '@angular/common';
import { FestivalService } from './festival.service';
import { ArtistaService } from '../artista/artista.service';
import { IArtista } from '../artista/artista.interface';
import { Genero } from '../Genero';
import { FormsModule } from '@angular/forms';
import { EntradaService } from '../entrada/entrada.service';
import { IEntrada, Tipo } from '../entrada/entrada.interface';

@Component({
  selector: 'app-festival',
  standalone: true,
  imports: [ArtistaComponent, EntradaComponent, CommonModule, FormsModule],
  templateUrl: './festival.component.html',
  styleUrl: './festival.component.css',
})
export class FestivalComponent {
  @Input() festival!: IFestival;
  @Input() festivales: IFestival[] = [];
  @Output() festivalesActualizados = new EventEmitter<IFestival[] | any>();

  editando: boolean = false;
  agregandoArtista: boolean = false;
  agregandoEntrada: boolean = false;

  mostrarEntrada: boolean = false;
  mostrarArtista: boolean = false;

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

  constructor(
    private festivalService: FestivalService,
    private artistaService: ArtistaService,
    private entradaService: EntradaService
  ) {}

  eliminarFestival(id: number): void {
    this.festivalService.deleteFestival(id).subscribe(() => {
      this.festivales = this.festivales.filter(
        (festival) => festival.id !== id
      );
      this.festivalesActualizados.emit(this.festivales);
    });
  }

  actualizarFestival(festival: IFestival): void {
    this.festival = festival;
  }

  agregarArtista() {
    this.artistaService
      .postArtista(this.festival.id, this.nuevoArtista)
      .subscribe(() => {
        this.festival.artistas.push(this.nuevoArtista);
      });
    this.agregandoArtista = false;
  }

  agregarEntrada() {
    this.entradaService
      .postEntrada(this.festival.id, this.nuevaEntrada)
      .subscribe(() => {
        this.festival.entradas.push(this.nuevaEntrada);
      });
    this.agregandoEntrada = false;
  }

  editarFestival() {
    this.festivalService.putFestival(this.festival).subscribe(() => {
      for (let festival of this.festivales) {
        if ((festival.id = this.festival.id)) {
          festival = this.festival;
        }
      }
      this.festivalesActualizados.emit(this.festivales);
      this.editando = false;
    });
  }
}
