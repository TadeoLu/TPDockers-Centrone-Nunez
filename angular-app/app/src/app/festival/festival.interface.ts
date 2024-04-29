import { IArtista } from '../artista/artista.interface';
import { IEntrada } from '../entrada/entrada.interface';
import { Genero } from '../Genero';

export interface IFestival {
  id: number;
  nombre: string;
  ubicacion: string;
  fechaInicio: Date;
  fechaFin: Date;
  artistas: Array<IArtista>;
  entradas: Array<IEntrada>;
  capacidadMaxima: number;
  tipoDeMusica: Genero;
}
