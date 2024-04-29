import FestivalRepo from "@src/repos/FestivalRepo";
import { IFestival } from "@src/models/Festival";
import { RouteError } from "@src/other/classes";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import Artista, { IArtista } from "@src/models/Artista";
import ArtistaRepo from "@src/repos/ArtistaRepo";

// **** Variables **** //

export const USER_NOT_FOUND_ERR = "User not found";

// **** Functions **** //

/**
 * Get all users.
 */

/**
 * Add one user.
 */
function addOne(idFestival: number, artista: IArtista): Promise<void> {
  return ArtistaRepo.add(idFestival, artista);
}

/**
 * Update one user.
 */
async function updateOne(idFestival: number, artista: IArtista): Promise<void> {
  /*const persists = await FestivalRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }*/
  return ArtistaRepo.update(idFestival, artista);
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
  return ArtistaRepo.delete(idFestival, idArtista);
}

// **** Export default **** //

export default {
  addOne,
  updateOne,
  delete: _delete,
} as const;
