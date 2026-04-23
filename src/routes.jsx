import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  Link,
} from "@tanstack/react-router";

import QuizComponent from "./components/QuizComponent";
import PokemonComponent from "./components/PokemonComponent";
import SaludoComponent from "./components/SaludoComponent";

// 🔹 Layout global
function Layout() {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Quiz</Link>
        <Link to="/pokemon" style={{ marginRight: "10px" }}>Pokemon</Link>
        <Link to="/saludo">Saludo</Link>
      </nav>

      <Outlet />
    </div>
  );
}

// 🔹 Root
const rootRoute = createRootRoute({
  component: Layout,
});

// 🔹 Rutas
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: QuizComponent,
});

const pokemonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pokemon",
  component: PokemonComponent,
});

const saludoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/saludo",
  component: SaludoComponent,
});

// 🔹 Árbol
const routeTree = rootRoute.addChildren([
  quizRoute,
  pokemonRoute,
  saludoRoute,
]);

// 🔹 EXPORT CLAVE
export const router = createRouter({ routeTree });