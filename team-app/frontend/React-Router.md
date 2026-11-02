## Decisión: navegación con React Router

### ¿Por qué?
La aplicación tiene varias pantallas (reclutar, equipos, misiones, historial...) y
queremos que cada una tenga su propia URL, que el botón "atrás" del navegador
funcione y que se pueda recargar o compartir un enlace sin volver al inicio.
Para eso usamos **React Router** (`react-router-dom`), la librería estándar de React.

### ¿Qué es?
React Router muestra un componente u otro según la URL, **sin recargar la página**.
Una "página" es simplemente un componente de React asociado a una ruta.

Usamos el **modo declarativo** (`BrowserRouter` + `Routes` + `Route`), que es el recomendado
para una SPA con Vite y sin renderizado en servidor. Vale tanto para la v6 como para la v7
(en la v7 el paquete se llama `react-router`, y `react-router-dom` sigue funcionando porque
reexporta lo mismo).

### Piezas que usamos
| Pieza | Para qué sirve |
|---|---|
| `BrowserRouter` | Envuelve la app (en `main.jsx`) y activa el router |
| `Routes` / `Route` | Une una URL (`path`) con un componente (`element`) |
| `Layout` + `Outlet` | Parte común (navbar) y hueco donde se pinta la página activa |
| `NavLink` / `Link` | Enlaces entre páginas, sin recargar. `NavLink` añade la clase `active` |
| `useParams` | Lee parámetros de la URL (por ejemplo el `id` en `/equipos/3`) |
| `useNavigate` | Cambia de página desde código (por ejemplo tras guardar un equipo) |

### Montaje

`StrictMode` por fuera, `BrowserRouter` dentro, y la app dentro de todo:

```jsx
// main.jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

```jsx
// App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<Reclutar />} />          {/* se ve en "/" */}
    <Route path="reclutas" element={<Reclutas />} />
    <Route path="equipos" element={<Equipos />} />
    <Route path="equipos/:id" element={<EquipoDetalle />} />
    <Route path="misiones" element={<Misiones />} />
    <Route path="historial" element={<Historial />} />
    <Route path="*" element={<NoEncontrado />} />   {/* 404, siempre al final */}
  </Route>
</Routes>
```

- `index` = la ruta hija que se muestra cuando la URL es justo la del padre.
- En las rutas hijas el `path` va **sin** barra inicial (`"misiones"`, no `"/misiones"`).

### Páginas
| URL | Archivo | Qué hace |
|---|---|---|
| `/` | `pages/Reclutar.jsx` | Aceptar o rechazar reclutas |
| `/reclutas` | `pages/Reclutas.jsx` | Lista de reclutados |
| `/equipos` | `pages/Equipos.jsx` | Gestionar equipos |
| `/equipos/:id` | `pages/EquipoDetalle.jsx` | Detalle de un equipo |
| `/misiones` | `pages/Misiones.jsx` | Elegir misión y ver % de éxito |
| `/historial` | `pages/Historial.jsx` | Misiones completadas |
| `*` | `pages/NoEncontrado.jsx` | Página 404 |

### Cómo añadir una página nueva
1. Crear el componente en `src/pages/` (por ejemplo `Ajustes.jsx`).
2. Añadir su ruta en `src/App.jsx`:
   ```jsx
   <Route path="ajustes" element={<Ajustes />} />
   ```
3. Añadir el enlace en la navbar (`src/components/Layout.jsx`):
   ```jsx
   <NavLink to="/ajustes">Ajustes</NavLink>
   ```

Un `.jsx` vacío da error: siempre tiene que exportar un componente (`export default`).

### Reglas
- Usar siempre `Link` o `NavLink` en vez de `<a href>`: el `<a>` recarga toda la
  página y se pierde el estado de React.
- Los parámetros de la URL llegan como **texto**: usar `Number(id)` si se compara
  con un número.
- En producción, nginx necesita `try_files $uri /index.html;` (ya está en
  `nginx.conf`), si no, recargar en `/equipos` da un 404.
- El enlace a la raíz lleva `end` (`<NavLink to="/" end>`), si no, siempre aparece activo
  porque todas las rutas empiezan por `/`.

### Tips útiles

**`NavLink` con clase propia**
```jsx
<NavLink
  to="/equipos"
  className={({ isActive }) => (isActive ? "link activo" : "link")}
>
  Equipos
</NavLink>
```

**`useNavigate`: navegar por código**
```jsx
const navigate = useNavigate();
navigate("/equipos");                     // ir a una ruta
navigate(-1);                             // volver atrás
navigate("/login", { replace: true });    // sin dejar rastro en el historial
```

**`useSearchParams`: filtros en la URL (`/misiones?estado=activa`)**
```jsx
const [params, setParams] = useSearchParams();
const estado = params.get("estado");
setParams({ estado: "completada" });
```

**`useLocation` y pasar datos entre páginas**
```jsx
navigate("/historial", { state: { desdeMision: 5 } });
// en la otra página:
const { state } = useLocation();
```
El `state` se pierde si se recarga o se entra directo por URL. Para datos importantes,
usar `params` o `search params`.

**Redirecciones**
```jsx
<Route path="inicio" element={<Navigate to="/" replace />} />
```

### Rutas protegidas (para cuando haya login)

El login va **fuera del Layout** (sin navbar). Las rutas internas se envuelven en una
ruta protegida:

```jsx
// components/RutaProtegida.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function RutaProtegida() {
  const logueado = localStorage.getItem("token"); // ajustar a cómo se guarde la sesión
  return logueado ? <Outlet /> : <Navigate to="/login" replace />;
}
```

```jsx
<Routes>
  <Route path="/login" element={<Login />} />

  <Route element={<RutaProtegida />}>
    <Route path="/" element={<Layout />}>
      {/* rutas internas */}
    </Route>
  </Route>
</Routes>
```

### Errores típicos
| Síntoma | Causa probable |
|---|---|
| Pantalla en blanco | Falta `BrowserRouter` o falta un archivo importado |
| La navbar se ve pero la página no | Falta `<Outlet />` en el `Layout` |
| Error "Failed to resolve import" | El archivo no existe o la ruta del `import` está mal |
| `.jsx` vacío da error | Tiene que exportar un componente |
| El enlace "/" siempre activo | Falta el `end` en el `NavLink` |
| 404 al recargar en producción | Falta `try_files $uri /index.html;` en nginx |
| `console.log` se ejecuta dos veces | Es `StrictMode` en desarrollo, en producción no pasa |
| `id` no coincide al comparar | El parámetro llega como texto: usar `Number(id)` |

### Para más adelante
`createBrowserRouter` + `RouterProvider` (modo de datos), `loader`, `action`, `errorElement`
y `lazy` (carga diferida de páginas). No hacen falta para esta app.
