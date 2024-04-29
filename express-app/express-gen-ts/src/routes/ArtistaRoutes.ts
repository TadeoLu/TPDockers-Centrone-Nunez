import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import FestivalService from "@src/services/FestivalService";
import { IFestival } from "@src/models/Festival";
import { IReq, IRes } from "./types/express/misc";
import ArtistaService from "@src/services/ArtistaService";
import { IArtista } from "@src/models/Artista";

// **** Functions **** //

async function add(req: IReq<{ id: number; artista: IArtista }>, res: IRes) {
  const { artista } = req.body;
  const { id } = req.params;
  await ArtistaService.addOne(Number(id), artista);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one festival.
 */
async function update(req: IReq<{ id: number; artista: IArtista }>, res: IRes) {
  const { artista } = req.body;
  const { id } = req.params;
  await ArtistaService.updateOne(Number(id), artista);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one festival.
 */
async function delete_(
  req: IReq<{ id: number; idArtista: number }>,
  res: IRes
) {
  const { id, idArtista } = req.params;
  await ArtistaService.delete(Number(id), Number(idArtista));
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  add,
  update,
  delete: delete_,
} as const;
