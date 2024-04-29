

import jsonfile from 'jsonfile';

import { IFestival } from '@src/models/Festival';
import { IEntrada } from '@src/models/Entrada';
import { IArtista } from '@src/models/Artista';


// **** Variables **** //

const DB_FILE_NAME = 'database.json';


// **** Types **** //

interface IDb {
  festivales: IFestival[]
  entradas: IEntrada[]
  artistas: IArtista[]
}


// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<IDb> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<IDb>;
}

/**
 * Update the file.
 */
function saveDb(db: IDb): Promise<void> {
  return jsonfile.writeFile((__dirname + '/' + DB_FILE_NAME), db);
}


// **** Export default **** //

export default {
  openDb,
  saveDb,
} as const;
