export enum Tipo {
  ExpVip,
  ExpNormal,
  ExpPobre,
}

export interface IEntrada {
  id: number;
  precio: number;
  tipo: Tipo;
}
