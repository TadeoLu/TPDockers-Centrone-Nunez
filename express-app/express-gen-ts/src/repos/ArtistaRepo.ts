import { getRandomInt } from "@src/util/misc";
import orm from "./MockOrm";
import { IFestival } from "@src/models/Festival";
import { IArtista } from "@src/models/Artista";

// **** Functions **** //

/**
 * See if a user with the given id exists.
 */

async function persists(festival: IFestival, id: number): Promise<boolean> {
  const db = await orm.openDb();
  for (const festival of db.festivales) {
    if (festival.id === id) {
      return true;
    }
  }
  return false;
}

/**
 * Add one user.
 */
async function add(idFestival: number, artista: IArtista): Promise<void> {
  const db = await orm.openDb();
  artista.id = getRandomInt();
  for (const festival of db.festivales) {
    if (festival.id === idFestival) {
      festival.artistas.push(artista);
    }
  }
  return orm.saveDb(db);
}

/**
 * Update a user.
 */
async function update(idFestival: number, artista: IArtista): Promise<void> {
  const db = await orm.openDb();
  for (const festival of db.festivales) {
    if (festival.id === idFestival) {
      for (let i = 0; i < festival.artistas.length; i++) {
        if (festival.artistas[i].id === artista.id) {
          const dbArtistas = festival.artistas[i];
          festival.artistas[i] = {
            ...dbArtistas,
            nombre: artista.nombre,
            apellido: artista.apellido,
            genero: artista.genero,
            edad: artista.edad,
          };
          return orm.saveDb(db);
        }
      }
    }
  }
}

/**
 * Delete one user.
 */
async function delete_(idFestival: number, idArtista: number): Promise<void> {
  const db = await orm.openDb();
  for (const festival of db.festivales) {
    if (festival.id === idFestival) {
      for (let i = 0; i < festival.artistas.length; i++) {
        if (festival.artistas[i].id === idArtista) {
          festival.artistas.splice(i, 1);
          return orm.saveDb(db);
        }
      }
    }
    return orm.saveDb(db);
  }
}

// **** Export default **** //

export default {
  persists,
  add,
  update,
  delete: delete_,
} as const;
