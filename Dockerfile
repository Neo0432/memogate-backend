# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и yarn.lock (или только package.json, если yarn.lock нет)
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем весь код проекта в рабочую директорию
COPY . .

# Устанавливаем Prisma CLI и запускаем миграции (если нужно)
RUN yarn prisma generate
RUN yarn migrate

# Компилируем TypeScript в JavaScript
RUN yarn build

# Открываем порт, на котором будет работать сервер
EXPOSE 5173

# Команда для запуска приложения
CMD ["yarn", "dev"]
