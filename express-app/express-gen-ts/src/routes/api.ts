import { Router } from "express";
import jetValidator from "jet-validator";

import Paths from "../constants/Paths";
import Festival from "@src/models/Festival";
import FestivalRoutes from "./FestivalRoutes";
import ArtistaRoutes from "./ArtistaRoutes";
import Artista from "@src/models/Artista";
import Entrada from "@src/models/Entrada";
import EntradaRoutes from "./EntradaRoutes";

// **** Variables **** //

const apiRouter = Router({ mergeParams: true }),
  validate = jetValidator();

// ** Add UserRouter ** //
const festivalRouter = Router({ mergeParams: true });
const entradaRouter = Router({ mergeParams: true });
const artistaRouter = Router({ mergeParams: true });
// Get all users
festivalRouter.get(Paths.Festival.Get, FestivalRoutes.getAll);

festivalRouter.get(Paths.Festival.GetOne, FestivalRoutes.getOne);

// Add one user
festivalRouter.post(
  Paths.Festival.Add,
  validate(["festival", Festival.isFestival]),
  FestivalRoutes.add
);

artistaRouter.post(
  Paths.Artista.Add,
  validate(["artista", Artista.isArtista]),
  ArtistaRoutes.add
);

entradaRouter.post(
  Paths.Entrada.Add,
  validate(["entrada", Entrada.isEntrada]),
  EntradaRoutes.add
);

// Update one user
festivalRouter.put(
  Paths.Festival.Update,
  validate(["festival", Festival.isFestival]),
  FestivalRoutes.update
);

artistaRouter.put(
  Paths.Artista.Update,
  validate(["artista", Artista.isArtista]),
  ArtistaRoutes.update
);

entradaRouter.put(
  Paths.Entrada.Update,
  validate(["entrada", Entrada.isEntrada]),
  EntradaRoutes.update
);

// Delete one user
festivalRouter.delete(
  Paths.Festival.Delete,
  validate(["id", "number", "params"]),
  FestivalRoutes.delete
);

artistaRouter.delete(
  Paths.Artista.Delete,
  validate(["id", "number", "params"]),
  ArtistaRoutes.delete
);

entradaRouter.delete(
  Paths.Entrada.Delete,
  validate(["id", "number", "params"]),
  EntradaRoutes.delete
);

// Add UserRouter
apiRouter.use(Paths.Festival.Base, festivalRouter);
apiRouter.use(
  Paths.Festival.Base + Paths.Festival.GetOne + Paths.Artista.Base,
  artistaRouter
);
apiRouter.use(
  Paths.Festival.Base + Paths.Festival.GetOne + Paths.Entrada.Base,
  entradaRouter
);

/**
 * @swagger
 * /api/festivales:
 *   get:
 *     summary: Retorna los festivales.
 *     description: Retorna todos los festivales que hay en la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 festivales:
 *                   type: array
 *                   example:
 *                     id: 10
 *                     nombre: LolaPaloza
 *                     ubicacion: Palermo
 *                     capacidadMaxima: 10000
 *                     tipoDeMusica: 1
 *   post:
 *     summary: Agrega Festivales.
 *     description: Agrega un festval a la base de datos.
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 festival:
 *                   type: array
 *                   example:
 *                     id: 10
 *                     nombre: LolaPaloza
 *                     ubicacion: Palermo
 *                     capacidadMaxima: 10000
 *                     tipoDeMusica: 1
 */

// **** Export default **** //

export default apiRouter;
