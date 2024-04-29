const INVALID_CONSTRUCTOR_PARAM =
  "nameOrObj arg must a string or an object " +
  "with the appropriate user keys.";

export interface IArtista {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  genero: Genero;
}

function new_(
  id?: number,
  nombre?: string,
  apellido?: string,
  edad?: number,
  genero?: Genero
): IArtista {
  return {
    id: id ?? -1,
    nombre: nombre ?? "",
    apellido: apellido ?? "",
    edad: edad ?? 0,
    genero: genero ?? Genero.BobMarley,
  };
}

function from(param: object): IArtista {
  console.log("aca");
  if (!isArtista(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  const p = param as IArtista;
  return new_(p.id, p.nombre, p.apellido, p.edad, p.genero);
}

function isArtista(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === "object" &&
    "id" in arg &&
    typeof arg.id === "number" &&
    "nombre" in arg &&
    typeof arg.nombre === "string" &&
    "apellido" in arg &&
    typeof arg.apellido === "string" &&
    "edad" in arg &&
    typeof arg.edad === "number"
  );
}
export default {
  new: new_,
  from,
  isArtista,
} as const;
