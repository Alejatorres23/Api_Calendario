# Api_Calendario – Orquestación de microservicios con Docker Compose

Proyecto del ITM – Evaluación 2 Seguimiento: orquestación de la contenerización de las APIs de **Festivos** y **Calendario**.

## Arquitectura

Todos los contenedores están en la red **`redcalendario`**:

| Contenedor | Tecnología | Función | Puerto en el equipo |
|---|---|---|---|
| `dockerbdfestivos` | MongoDB 7 | Base de datos de festivos | — (solo red interna) |
| `dockerapifestivos` | Node.js + Express | Microservicio apiFestivos | 8082 |
| `dockerbdcalendario` | PostgreSQL 16 | Base de datos del calendario | — (solo red interna) |
| `dockerapicalendario` | Spring Boot | Microservicio apiCalendario | 8083 |

Además, el contenedor `seedfestivos` se ejecuta una sola vez al iniciar, carga los festivos en MongoDB y termina.

La API Calendario consume la API Festivos por el nombre del contenedor dentro de la red (`http://dockerapifestivos:8080/api/festivos`).

## Cómo levantar todo

Desde la carpeta raíz del proyecto (donde está `docker-compose.yml`):

```
docker compose up -d --build
docker compose ps
```

## Pruebas

```
curl.exe http://localhost:8082/api/festivos/verificar/2023/6/12
curl.exe http://localhost:8082/api/festivos/obtener/2023
curl.exe http://localhost:8083/api/festivos/obtener/2023
curl.exe http://localhost:8083/api/calendario/generar/2023
curl.exe http://localhost:8083/api/calendario/listar/2023
```

## Verificar la red

```
docker network inspect redcalendario
```

## Apagar

```
docker compose down        # apaga y elimina los contenedores
docker compose down -v     # además borra los datos de las bases de datos
```
