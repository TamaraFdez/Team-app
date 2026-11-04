Prueba que el back funciona: OK
http://localhost:3000/api/health


```
docker build -t team-back ./backend
docker run -p 3000:3000 team-back
```