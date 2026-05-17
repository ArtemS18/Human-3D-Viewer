# Используем базовый образ с Apache HTTP Server
FROM httpd:latest
# Копируем файлы веб-приложения внутрь контейнера в рабочую директорию сервера
COPY . /usr/local/apache2/htdocs/