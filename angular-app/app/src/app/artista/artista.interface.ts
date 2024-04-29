import { Genero } from "../Genero"

export interface IArtista{
    id: number,
    nombre: string,
    apellido: string,
    edad: number,
    genero: Genero   
}