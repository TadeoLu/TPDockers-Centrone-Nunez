import FestivalRepo from '@src/repos/FestivalRepo';
import { IFestival } from '@src/models/Festival';
import { RouteError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

/**
 * Get all users.
 */
function getAll(): Promise<IFestival[]> {
  return FestivalRepo.getAll();
}

function getOne(id: number): Promise<IFestival | null> {
    return FestivalRepo.getOne(id);
  }

/**
 * Add one user.
 */
function addOne(user: IFestival): Promise<void> {
  return FestivalRepo.add(user);
}

/**
 * Update one user.
 */
async function updateOne(user: IFestival): Promise<void> {
  const persists = await FestivalRepo.persists(user.id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Return user
  return FestivalRepo.update(user);
}

/**
 * Delete a user by their id.
 */
async function _delete(id: number): Promise<void> {
  const persists = await FestivalRepo.persists(id);
  if (!persists) {
    throw new RouteError(
      HttpStatusCodes.NOT_FOUND,
      USER_NOT_FOUND_ERR,
    );
  }
  // Delete user
  return FestivalRepo.delete(id);
}


// **** Export default **** //

export default {
  getAll,
  getOne,
  addOne,
  updateOne,
  delete: _delete,
} as const;
