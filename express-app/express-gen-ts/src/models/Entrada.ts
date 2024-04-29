enum Tipo{
    ExpVip,
    ExpNormal,
    ExpPobre
}

const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' + 
  'with the appropriate user keys.';

export interface IEntrada{
    id: number,
    precio: number,
    tipo: Tipo,
}

function new_(
    id?: number,
    precio?: number,
    tipo?: Tipo,
  ): IEntrada {
    return {
      id: (id ?? -1),
      precio: (precio ?? -1),
      tipo: (tipo ?? Tipo.ExpPobre),
    };
  }

  function from(param: object): IEntrada {
    if (!isEntrada(param)) {
      throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param as IEntrada;
    return new_(p.precio, p.tipo, p.id);
  }
  
  function isEntrada(arg: unknown): boolean {
    return (
      !!arg &&
      typeof arg === 'object' &&
      'id' in arg && typeof arg.id === 'number' && 
      'precio' in arg && typeof arg.precio === 'number'
    );
  }
export default {
  new: new_,
  from,
  isEntrada,
} as const;



