import FestivalRepo from "@src/repos/FestivalRepo";
import { IFestival } from "@src/models/Festival";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import Artista, { IEntrada } from "@src/models/Entrada";
import EntradaRepo from "@src/repos/EntradaRepo";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = "User not found";

// **** Functions **** //

/**
 * Get all users.
 */

/**
 * Add one user.
 */
function addOne(idFestival: number, entrada: IEntrada): Promise<void> {
  return EntradaRepo.add(idFestival, entrada);
}

/**
 * Update one user.
 */
async function updateOne(idFestival: number, entrada: IEntrada): Promise<void> {
  /*const persists = await FestivalRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }*/
  return EntradaRepo.update(idFestival, entrada);
}

/**
 * Delete a user by their id.
 */
async function _delete(idFestival: number, idArtista: number): Promise<void> {
  // const persists = await FestivalRepo.persists(id);
  // if (!persists) {
  //   throw new RouteError(
  //     HttpStatusCodes.NOT_FOUND,
  //     USER_NOT_FOUND_ERR,
  //   );
  // }
  return EntradaRepo.delete(idFestival, idArtista);
}

// **** Export default **** //

export default {
  addOne,
  updateOne,
  delete: _delete,
} as const;
