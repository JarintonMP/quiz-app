import {
  createRouter,
  RouterProvider,
  createRoute,
  createRootRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";

import QuizComponent from "./components/QuizComponent";
import SaludoComponent from "./components/SaludoComponent";
import PokemonComponent from "./components/PokemonComponent";

// 🔹 Layout principal (MENÚ)
function Layout() {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ margin: "10px" }}>
          Quiz
        </Link>

        <Link to="/pokemon" style={{ margin: "10px" }}>
          Pokemon
        </Link>

        <Link to="/saludo" style={{ margin: "10px" }}>
          Saludo
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}

//  Rutas
const rootRoute = createRootRoute({
  component: Layout,
});

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

// Árbol de rutas
const routeTree = rootRoute.addChildren([
  quizRoute,
  pokemonRoute,
  saludoRoute,
]);

const router = createRouter({
  routeTree,
});

export default function AppRouter() {
  return <RouterProvider router={router} />;
}