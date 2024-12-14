# Inicialización y librerias utilizadas
- npm init -y
- npm install express mongoose cors dotenv body-parser bcryptjs
- npm install -D typescript @types/express @types/cors @types/body-parser @types/bcryptjs
- npx tsc --init

# Para construir y levantar la base de datos en docker
- docker-compose -f docker-compose.yml up --build

# Para ejecutar el backend
- npx tsc
- npx ts-node-dev-src/index.ts