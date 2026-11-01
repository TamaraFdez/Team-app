# Team-App — frontend inicial

Implementación frontend en React + Vite para las tres pantallas prioritarias:
- **Overview**: resumen operativo, equipos, actividad y estado global.
- **Recruit**: catálogo de candidatos con filtros, búsqueda y acciones de reclutamiento.
- **Teams**: creación de equipos, selección de unidad y asignación de integrantes.

## Requisitos
- Node.js 18 o superior
- npm

## Arranque
```bash
npm install
npm run dev
```

Para comprobar la compilación:
```bash
npm run build
```

## Decisiones de diseño
- Paleta oscura basada en azul noche, azul acero y cian.
- Rajdhani para títulos y cifras; Inter para lectura y controles.
- Sidebar persistente en escritorio y navegación desplegable en móvil.
- Componentes y estilos responsive.
- Datos de demostración en estado local de React.


## Alcance y siguientes pasos
Esta entrega es una **base visual funcional de frontend**, no una aplicación conectada todavía a Express, MySQL ni a la API externa de Superhero API. Los datos se encuentran en `src/App.jsx` para facilitar su sustitución posterior por llamadas a la API.