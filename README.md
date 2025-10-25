Test React
Autora: Veronica Daniela Conti
Fecha: 24/10/2025
Repositorio: https://github.com/VeronicaConti/test-react
Demo backend: https://test-react-production.up.railway.app/ping

tecnologías
Frontend: React + React Router
Backend: Node.js + Express
Base de datos: PostgreSQL (Railway)
Despliegue: Railway + GitHub

## Estructura - Frontend y Backend estan ambos en el main

test-react/ 
├── backend/ 
│ ├── server.js 
│ ├── db.js 
│ ├── package.json 
│ ├── package-lock.json 
│ └── .env (ignorado por Git) 
├── frontend/ 
│ ├── src/ 
│ ├── public/ 
│ ├── package.json 
│ └── README.md 
├── .gitignore 
└── README.md


## Instalación y ejecución

### Requisitos previos

- Node.js v18+
- npm
- Acceso a una URI de PostgreSQL válida

### Backend

```bash
cd backend
npm install
npm start

El servidor se ejecuta en http://localhost:3001.

### Frontend

cd frontend
npm install
npm start

La aplicación se ejecuta en http://localhost:3000.

Creá un archivo .env dentro de la carpeta backend/ con el siguiente contenido:
...
Este archivo está ignorado por Git y no debe subirse al repositorio.
Si estás revisando el proyecto, solicitá acceso o generá tus propias credenciales.

Enlaces
Repositorio en GitHub:
  - https://github.com/VeronicaConti/test-react
Backend desplegado en Railway:
  - https://test-react-production.up.railway.app

Consideraciones técnicas
El backend puede no funcionar si:
* Falta el archivo .env o contiene una URI inválida
* La base de datos está caída o las credenciales fueron revocadas
* No se ejecutó npm install en backend/
* El puerto 3001 está ocupado o bloqueado
* Railway no tiene configurada la variable DATABASE_URL
* El frontend apunta a una URL incorrecta del backend

Para evitar estos errores, asegurate de configurar correctamente las variables de entorno y revisar los logs del servidor.

Notas 
# El proyecto fue limpiado de carpetas node_modules/ y archivos .env para mantener seguridad.
# Se recomienda clonar el repo, instalar dependencias y configurar variables de entorno localmente.
# No se pudo desplegar publicamente el Frontend como si se realizo con el backend.
# La URI de PostgreSQL fue migrada a variables de entorno para evitar leaks.
# El backend está listo para producción y fue testeado localmente
# Todo el código fue migrado en la rama main, incluyendo backend, frontend y documentación.




