/**
 * Express router paths go here.
 */

export default {
  Base: "/api",
  Festival: {
    Base: "/festivales",
    Get: "/",
    GetOne: "/:id",
    Add: "/",
    Update: "/",
    Delete: "/:id",
  },
  Entrada: {
    Base: "/entradas",
    Get: "/",
    Add: "/",
    Update: "/",
    Delete: "/:idEntrada",
  },
  Artista: {
    Base: "/artistas",
    Get: "/",
    Add: "/",
    Update: "/",
    Delete: "/:idArtista",
  },
} as const;
