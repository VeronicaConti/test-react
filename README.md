# Test React 

**Autora:** Veronica Daniela Conti  
**Fecha:** 24/10/2025  
**Repositorio:** [https://github.com/VeronicaConti/test-react](https://github.com/VeronicaConti/test-react)  
**Demo backend:** [https://test-react-production.up.railway.app/ping](https://test-react-production.up.railway.app/ping)

---

## tecnologías

- **Frontend:** React + React Router
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL (Railway)
- **Despliegue:** Railway + GitHub

---

## estructura
test-react/
├── frontend/ 
  ├── src/ 
  ├── views/ 
  ├── App.js 
  ├── package.json 
├── backend/ 
  ├── server.js 
  ├── db.js 
  ├── package.json 
  └── README.md

---

## Descripción del test

Se desarrolló una aplicación con dos vistas principales:

- `MyOrders`: muestra las órdenes existentes
- `AddEditOrder`: permite crear o editar órdenes

El backend expone el endpoint `/ping` que valida la conexión con PostgreSQL usando `SELECT NOW()` y devuelve la fecha actual del servidor.

---

## Problemas enfrentados

- Error de autenticación con PostgreSQL, no se podian guardar ni acceder a los datos en las tablas.
- Variables mal configuradas en Railway (`${{ Postgres.DATABASE_URL }}`)
- Subrepositorios Git en carpetas internas (`.git` en `backend/` y `frontend/`)
-  Ruta `/` no definida en el backend (`Cannot GET /`)

---

## Soluciones aplicadas

- Configuración manual de `DATABASE_URL` en Railway
- Eliminación de `.git` internos y unificación del proyecto
- Validación de conexión con PostgreSQL desde `/ping`
- Subida completa a GitHub en rama `master`

---

## Cómo correr el proyecto localmente

### Backend

```bash
cd backend
npm install
node server.js


### Frontend
cd frontend
npm install
npm start

Frontend desplegado: [https://test-react-frontend.netlify.app](https://test-react-frontend.netlify.app)
Backend desplegado: [https://test-react-production.up.railway.app/ping](https://test-react-production.up.railway.app/ping)
Repositorio completo: https://github.com/VeronicaConti/test-react

