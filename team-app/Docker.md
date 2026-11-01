## Ejecutar con Docker

### Requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y abierto.

### Arrancar la aplicación
Desde la carpeta raíz del proyecto (donde está `docker-compose.yml`):

```bash
docker compose up --build
```

Cuando termine de construir, abrir:

- **Aplicación:** http://localhost:8081
- **Comprobar el back:** http://localhost:8081/api/health (debe devolver `{"ok":true}`)

### Parar la aplicación
- `Ctrl + C` en la terminal donde está corriendo.
- `docker compose down` para eliminar los contenedores.

### Comandos útiles
| Comando | Para qué sirve |
|---|---|
| `docker compose up --build` | Construye las imágenes y arranca todo |
| `docker compose up -d` | Arranca en segundo plano |
| `docker compose down` | Para y elimina los contenedores |
| `docker compose logs backend` | Ver los logs del back |
| `docker compose logs frontend` | Ver los logs del front |
| `docker compose ps` | Ver qué contenedores están corriendo |

> Si cambias código del front o del back, hay que volver a ejecutar
> `docker compose up --build`, porque el código se copia dentro de la imagen.

### Cómo funciona
- **frontend:** React + Vite se compila y se sirve con nginx.
- **backend:** API en Node/Express (puerto interno 3000, no accesible desde fuera).
- nginx reenvía las peticiones que empiezan por `/api/` al back, así que desde React
  se llama siempre con rutas relativas: `fetch('/api/...')`.

### Problemas comunes
- **`ports are not available` / puerto 8081 ocupado:** otro programa usa ese puerto.
  Cambiar el número de la izquierda en `docker-compose.yml` (por ejemplo `"8082:80"`).
- **`npm ci` falla:** `package.json` y `package-lock.json` no coinciden. Ejecutar
  `npm install` dentro de `frontend/` y volver a construir.
- **404 al recargar una página (por ejemplo `/equipos`):** comprobar que `nginx.conf`
  tiene `try_files $uri /index.html;`.
- **502 Bad Gateway en `/api/`:** el back no está corriendo; mirar
  `docker compose logs backend`.

### Desarrollo sin Docker
Para programar es más cómodo no usar Docker:

```bash
# Terminal 1 - back
cd backend
npm install
node index.js

# Terminal 2 - front
cd frontend
npm install
npm run dev
```

El front proxifica `/api` al back (configurado en `vite.config.js`).