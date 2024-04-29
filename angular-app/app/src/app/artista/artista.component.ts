import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArtista } from './artista.interface';
import { FormsModule } from '@angular/forms';
import { Genero } from '../Genero';
import { CommonModule } from '@angular/common';
import { IFestival } from '../festival/festival.interface';
import { ArtistaService } from './artista.service';

@Component({
  selector: 'app-artista',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './artista.component.html',
  styleUrl: './artista.component.css',
})
export class ArtistaComponent {
  @Input() artista!: IArtista;
  @Input() festival!: IFestival;
  @Output() actualizarFestival = new EventEmitter<IFestival | any>();

  editando: boolean = false;
  generos = Object.keys(Genero).filter(
    (key: any) => !isNaN(Number(Genero[key]))
  );

  constructor(private artistaService: ArtistaService) {}

  guardarEdicion() {
    this.editando = false;
    this.artistaService
      .putArtista(this.festival.id, this.artista)
      .subscribe(() => {
        for (let artista of this.festival.artistas) {
          if (artista.id === this.artista.id) {
            artista = this.artista;
          }
        }
        this.actualizarFestival.emit(this.festival);
      });
  }

  borrarArtista() {
    this.artistaService
      .deleteArtista(this.festival.id, this.artista.id)
      .subscribe(() => {
        this.festival.artistas = this.festival.artistas.filter(
          (artista) => artista.id !== this.artista.id
        );
        this.actualizarFestival.emit(this.festival);
      });
  }

}
