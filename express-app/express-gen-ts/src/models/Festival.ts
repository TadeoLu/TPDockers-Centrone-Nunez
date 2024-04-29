import { IArtista } from "./Artista";
import { IEntrada } from "./Entrada";
import moment from 'moment';

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

export interface IFestival{
    id: number,
    nombre: string,
    ubicacion: string,
    fechaInicio: Date,
    fechaFin: Date,
    artistas: Array<IArtista>,
    entradas: Array<IEntrada>,
    capacidadMaxima: number,
    tipoDeMusica: Genero,
}

function new_(
    id?: number,
    nombre?: string,
    ubicacion?: string,
    fechaInicio?: Date,
    fechaFin?: Date,
    artistas?: Array<IArtista>,
    entradas?: Array<IEntrada>,
    capacidadMaxima?: number,
    tipoDeMusica?: Genero,
  ): IFestival {
    return {
    id: (id ?? -1),
    nombre: (nombre ?? ''),
    ubicacion: (ubicacion ?? ''),
    fechaInicio: (fechaInicio ? new Date(fechaInicio) : new Date()),
    fechaFin: (fechaFin ? new Date(fechaFin) : new Date()),
    artistas: (artistas ?? new Array<IArtista>()),
    entradas: (entradas ?? new Array<IEntrada>()),
    capacidadMaxima: (capacidadMaxima ?? 0),
    tipoDeMusica: (tipoDeMusica ?? Genero.BobMarley)
    };
  }

  function from(param: object): IFestival {
    if (!isFestival(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IFestival;
    return new_(p.id, p.nombre, p.ubicacion, p.fechaInicio, p.fechaFin, p.artistas, p.entradas, p.capacidadMaxima, p.tipoDeMusica);
  }

  function isFestival(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'id' in arg && typeof arg.id === 'number' &&
      'nombre' in arg && typeof arg.nombre === 'string' &&
      'ubicacion' in arg && typeof arg.ubicacion === 'string' &&
      'fechaInicio' in arg && moment(arg.fechaInicio as string | Date).isValid() &&
      'fechaFin' in arg && moment(arg.fechaFin as string | Date).isValid() &&
      'capacidadMaxima' in arg && typeof arg.capacidadMaxima === 'number'
    );
  }

  
export default {
    new: new_,
    from,
    isFestival,
  } as const;