## Decisión: navegación con React Router

### ¿Por qué?
La aplicación tiene varias pantallas (reclutar, equipos, misiones, historial...) y
queremos que cada una tenga su propia URL, que el botón "atrás" del navegador
funcione y que se pueda recargar o compartir un enlace sin volver al inicio.
Para eso usamos **React Router** (`react-router-dom`), la librería estándar de React.

### ¿Qué es?
React Router muestra un componente u otro según la URL, **sin recargar la página**.
Una "página" es simplemente un componente de React asociado a una ruta.

### Piezas que usamos
| Pieza | Para qué sirve |
|---|---|
| `BrowserRouter` | Envuelve la app (en `main.jsx`) y activa el router |
| `Routes` / `Route` | Une una URL (`path`) con un componente (`element`) |
| `Layout` + `Outlet` | Parte común (navbar) y hueco donde se pinta la página activa |
| `NavLink` / `Link` | Enlaces entre páginas, sin recargar. `NavLink` añade la clase `active` |
| `useParams` | Lee parámetros de la URL (por ejemplo el `id` en `/equipos/3`) |
| `useNavigate` | Cambia de página desde código (por ejemplo tras guardar un equipo) |

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
   <Route path="/ajustes" element={<Ajustes />} />
   ```
3. Añadir el enlace en la navbar (`src/components/Layout.jsx`):
   ```jsx
   <NavLink to="/ajustes">Ajustes</NavLink>
   ```

### Reglas
- Usar siempre `Link` o `NavLink` en vez de `<a href>`: el `<a>` recarga toda la
  página y se pierde el estado de React.
- Los parámetros de la URL llegan como **texto**: usar `Number(id)` si se compara
  con un número.
- En producción, nginx necesita `try_files $uri /index.html;` (ya está en
  `nginx.conf`), si no, recargar en `/equipos` da un 404.