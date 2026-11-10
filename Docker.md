## Ejecutar con Docker

### Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y abierto.

### Arrancar la aplicación

Desde la carpeta raíz del proyecto (donde se encuentra `docker-compose.yml`):

**Producción:**

```bash
docker compose up --build -d
```

**Desarrollo:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Cuando termine de arrancar, acceder a:

- **Aplicación en producción:** http://localhost:8081
- **Aplicación en desarrollo:** http://localhost:5173
- **Comprobar el backend:** http://localhost:8081/api/health (producción) o http://localhost:5173/api/health (desarrollo). Debe devolver `{"ok":true}`.

### Parar la aplicación

Para detener y eliminar los contenedores:

**Producción:**

```bash
docker compose down
```

**Desarrollo:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

Estos comandos eliminan los contenedores y la red, pero conservan el volumen de MariaDB y sus datos.

**Importante:** para eliminar también los datos de la base de datos:

```bash
docker compose down -v
```

No ejecutar este último comando salvo que se quiera borrar la base de datos.

### Comandos útiles

| Comando | Para qué sirve |
|---|---|
| `docker compose up --build -d` | Construye las imágenes y arranca producción en segundo plano |
| `docker compose up -d` | Arranca los servicios en segundo plano |
| `docker compose down` | Para y elimina los contenedores |
| `docker compose logs -f backend` | Muestra los logs del backend en tiempo real |
| `docker compose logs -f frontend` | Muestra los logs del frontend en tiempo real |
| `docker compose ps` | Muestra el estado de los contenedores |
| `docker compose exec database mariadb -u teamapp_user -p teamapp` | Accede a la consola de MariaDB |

Para los comandos de desarrollo, añadir los dos archivos Compose:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml [comando]
```

### Actualización del código

**En desarrollo:**

Los cambios realizados en los archivos del frontend y backend se reflejan automáticamente gracias a los volúmenes configurados en Docker:

- React utiliza Vite y actualiza la interfaz mediante HMR.
- El backend utiliza Nodemon, que reinicia el servidor cuando detecta cambios.

No es necesario reconstruir las imágenes después de cada modificación.

Si se añaden dependencias o se modifican los Dockerfiles, será necesario reconstruir las imágenes.

**En producción:**

Cuando los cambios estén terminados y comprobados en desarrollo, detener el entorno de desarrollo y ejecutar:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
docker compose up --build -d
```

Docker reconstruirá las imágenes utilizando el código actualizado del proyecto.

### Cómo funciona

- **Frontend:** aplicación React. En producción, Vite genera los archivos estáticos y Nginx los sirve. En desarrollo, Vite ejecuta el servidor de desarrollo.
- **Backend:** API desarrollada con Node.js y Express, accesible internamente en el puerto 3000.
- **Nginx:** en producción, recibe las peticiones del frontend y redirige las que empiezan por `/api/` al backend.
- **Vite:** en desarrollo, utiliza un proxy para redirigir las peticiones `/api/` al backend.
- **Base de datos:** MariaDB almacena los usuarios, personajes, equipos, reclutamientos e historial de misiones.

Desde React se utilizan siempre rutas relativas para las peticiones a la API:

```javascript
fetch('/api/...')
```

### Inicialización de la base de datos

Al iniciar el backend:

1. Comprueba la conexión con MariaDB.
2. Crea las tablas necesarias si todavía no existen.
3. Comprueba si ya hay personajes almacenados.
4. Si la tabla está vacía, descarga los personajes de la API de Akabab y los almacena en la base de datos.
5. Finalmente, inicia el servidor Express.

Los datos se conservan en un volumen Docker llamado `mariadb_data`, por lo que no se pierden al detener los contenedores.

### Problemas comunes

- **`ports are not available` / puerto 8081 ocupado:** otro programa está utilizando ese puerto. Cambiar el número de la izquierda en `docker-compose.yml` (por ejemplo, `"8082:80"`).

- **`npm ci` falla:** comprobar que `package.json` y `package-lock.json` están sincronizados. Ejecutar `npm install` en la carpeta correspondiente y volver a construir.

- **404 al recargar una página (por ejemplo, `/equipos`):** comprobar que `nginx.conf` contiene `try_files $uri $uri/ /index.html;`.

- **502 Bad Gateway en `/api/`:** el backend no está funcionando correctamente. Consultar los registros con `docker compose logs -f backend`.

- **La base de datos no se inicializa:** comprobar que MariaDB está saludable y revisar los registros del backend. También se puede comprobar el estado con `docker compose ps`.