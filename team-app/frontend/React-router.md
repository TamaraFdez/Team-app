# Tips de React Router

Guía rápida para no perderse. Se usa `react-router-dom` (en la v7 también vale `react-router`).

## 1. Instalación

```bash
npm install react-router-dom
```

## 2. Montaje básico

`StrictMode` por fuera, `BrowserRouter` dentro, y la app dentro de todo:

```jsx
// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

## 3. Rutas y página index

```jsx
// App.jsx
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      {/* Sin menú */}
      <Route path="/login" element={<Login />} />

      {/* Con menú (Layout) */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />   {/* se ve en "/" */}
        <Route path="misiones" element={<Misiones />} />
        <Route path="equipos" element={<Equipos />} />
        <Route path="equipos/:id" element={<EquipoDetalle />} />
        <Route path="*" element={<NoEncontrado />} />  {/* 404, siempre al final */}
      </Route>
    </Routes>
  );
}
```

- `index` = la ruta hija que se muestra cuando la URL es justo la del padre.
- `path="*"` atrapa cualquier URL que no exista.
- En las rutas hijas el `path` va **sin** barra inicial (`"misiones"`, no `"/misiones"`).

## 4. Layout y `<Outlet />`

El `Outlet` es el **hueco** donde se pinta la página hija.

```jsx
// components/Layout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/misiones">Misiones</NavLink>
        <NavLink to="/equipos">Equipos</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
```

> Sin `Outlet` se ve el Layout pero las páginas hijas no aparecen. Es el fallo más típico.

## 5. `Link` vs `NavLink`

- **`Link`**: enlace normal, sin recargar la página. Nunca uses `<a href>` para rutas internas.
- **`NavLink`**: igual, pero añade la clase `active` cuando es la ruta actual.

```jsx
<NavLink to="/misiones">Misiones</NavLink>
<NavLink to="/" end>Dashboard</NavLink>   {/* "end" para que "/" no esté activo siempre */}

<NavLink
  to="/equipos"
  className={({ isActive }) => (isActive ? "link activo" : "link")}
>
  Equipos
</NavLink>
```

```css
nav a.active { font-weight: bold; }
```

## 6. Hooks más útiles

### `useNavigate`: navegar por código

```jsx
const navigate = useNavigate();
navigate("/dashboard");   // ir a una ruta
navigate(-1);             // volver atrás
navigate("/login", { replace: true });  // sin dejar rastro en el historial
```

### `useParams`: parámetros de la URL

```jsx
// ruta: equipos/:id
const { id } = useParams();
```

Enlazar: `<Link to={`/equipos/${equipo.id}`}>Ver</Link>`

### `useSearchParams`: query params (`?estado=activa`)

```jsx
const [params, setParams] = useSearchParams();
const estado = params.get("estado");
setParams({ estado: "completada" });
```

### `useLocation`: dónde estoy

```jsx
const { pathname, state } = useLocation();
```

### Pasar datos entre páginas

```jsx
navigate("/historial", { state: { desdeMision: 5 } });
// en la otra página:
const { state } = useLocation();
```

> El `state` se pierde si el usuario recarga o entra directo por URL. Para datos importantes, usa `params` o `search params`.

## 7. Redirecciones con `<Navigate>`

```jsx
<Route path="/inicio" element={<Navigate to="/" replace />} />
```

## 8. Rutas protegidas (login)

```jsx
// components/RutaProtegida.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function RutaProtegida() {
  const logueado = localStorage.getItem("token"); // ajusta a cómo guardes la sesión
  return logueado ? <Outlet /> : <Navigate to="/login" replace />;
}
```

```jsx
<Route element={<RutaProtegida />}>
  <Route path="/" element={<Layout />}>
    {/* rutas internas */}
  </Route>
</Route>
```

## 9. Añadir una página nueva (3 pasos)

1. Crear el archivo en `pages/` (PascalCase): `Dashboard.jsx`
2. Importarlo en `App.jsx`
3. Añadir su `<Route>`

```jsx
// pages/Dashboard.jsx
export default function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

## 10. Errores típicos

| Síntoma | Causa probable |
|---|---|
| Pantalla en blanco | Falta `BrowserRouter` o falta un archivo importado |
| El menú se ve pero la página no | Falta `<Outlet />` en el Layout |
| Error "Failed to resolve import" | El archivo no existe o la ruta del `import` está mal |
| `.jsx` vacío da error | Tiene que exportar un componente (`export default`) |
| El enlace "/" siempre activo | Falta el `end` en el `NavLink` |
| 404 al recargar en producción | El servidor debe redirigir todo a `index.html` |
| `console.log` se ejecuta dos veces | Es `StrictMode` en desarrollo, en producción no pasa |

## 11. Para más adelante

`createBrowserRouter`, `loader`, `action`, `errorElement`, `lazy` (carga diferida de páginas). Con lo de arriba ya tienes para una app completa.
