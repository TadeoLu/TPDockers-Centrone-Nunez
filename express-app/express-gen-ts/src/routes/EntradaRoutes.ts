import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import FestivalService from "@src/services/FestivalService";
import { IFestival } from "@src/models/Festival";
import { IReq, IRes } from "./types/express/misc";
import EntradaService from "@src/services/EntradaService";
import { IEntrada } from "@src/models/Entrada";

// **** Functions **** //

async function add(req: IReq<{ id: number; entrada: IEntrada }>, res: IRes) {
  const { entrada } = req.body;
  const { id } = req.params;
  await EntradaService.addOne(Number(id), entrada);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one festival.
 */
async function update(req: IReq<{ id: number; entrada: IEntrada }>, res: IRes) {
  const { entrada } = req.body;
  const { id } = req.params;
  await EntradaService.updateOne(Number(id), entrada);
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
  await EntradaService.delete(Number(id), Number(idArtista));
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  add,
  update,
  delete: delete_,
} as const;
