import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEntrada, Tipo } from './entrada.interface';
import { IFestival } from '../festival/festival.interface';
import { Genero } from '../Genero';
import { EntradaService } from './entrada.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entrada',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.css',
})
export class EntradaComponent {
  @Input() entrada!: IEntrada;
  @Input() festival!: IFestival;
  @Output() actualizarFestival = new EventEmitter<IFestival | any>();

  editando: boolean = false;
  generos = Object.keys(Genero).filter(
    (key: any) => !isNaN(Number(Genero[key]))
  );
  tipos = Object.keys(Tipo).filter((key: any) => !isNaN(Number(Tipo[key])));
  constructor(private entradaService: EntradaService) {}

  guardarEdicion() {
    this.editando = false;
    this.entradaService
      .putEntrada(this.festival.id, this.entrada)
      .subscribe(() => {
        for (let entrada of this.festival.entradas) {
          if (entrada.id === this.entrada.id) {
            entrada = this.entrada;
          }
        }
        this.actualizarFestival.emit(this.festival);
      });
  }

  borrarEntrada() {
    this.entradaService
      .deleteEntrada(this.festival.id, this.entrada.id)
      .subscribe(() => {
        this.festival.entradas = this.festival.entradas.filter(
          (entrada) => entrada.id !== this.entrada.id
        );
        this.actualizarFestival.emit(this.festival);
      });
  }
}
