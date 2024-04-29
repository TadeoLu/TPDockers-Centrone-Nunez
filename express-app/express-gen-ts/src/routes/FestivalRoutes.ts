import HttpStatusCodes from "@src/constants/HttpStatusCodes";

import FestivalService from "@src/services/FestivalService";
import { IFestival } from "@src/models/Festival";
import { IReq, IRes } from "./types/express/misc";

// **** Functions **** //

/**
 * Get all festivales.
 */
async function getAll(_: IReq, res: IRes) {
  const festivales = await FestivalService.getAll();
  return res.status(HttpStatusCodes.OK).json({ festivales });
}

async function getOne(req: IReq<{ id: number }>, res: IRes) {
  const { id } = req.params;
  const festival = await FestivalService.getOne(Number(id));
  return res.status(HttpStatusCodes.OK).json({ festival });
}

/**
 * Add one festival.
 */
async function add(req: IReq<{ festival: IFestival }>, res: IRes) {
  const { festival } = req.body;
  await FestivalService.addOne(festival);
  return res.status(HttpStatusCodes.CREATED).end();
}

/**
 * Update one festival.
 */
async function update(req: IReq<{ festival: IFestival }>, res: IRes) {
  const { festival } = req.body;
  await FestivalService.updateOne(festival);
  return res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one festival.
 */
async function delete_(req: IReq, res: IRes) {
  const id = +req.params.id;
  await FestivalService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  getAll,
  getOne,
  add,
  update,
  delete: delete_,
} as const;
