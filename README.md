## Клиент-серверное приложение CI сервер

### Сформировать статические файлы:

В папке client выполнить npm run build

### Запуск сервера

Версия Node: 14.7.0, добавить .env с содержанием API_TOKEN=...(ваш токен),
выполнить в терминале: npm i, npm run start, сервер по дефолту запустится на `8000` порту, http://localhost:8000/

### Тесты

#### Модульное тестирование

В папке client/src/\_\_tests\_\_. Команда для запуска тестов npm run test в папке client. Папка client/dataForTests заглушка для модульного и интегрционного тестирования.

#### Интеграционное тестирование

-   Установить JDK
-   В корне проекта выполнить npm link html-url-decorator.
-   Установить глобально selenium-standalone: npm install selenium-standalone --global.
-   Далее выполнить: selenium-standalone install.
-   В отдельной папке терминала выполнить selenium-standalone start (к сожалению использование плагина hermione-selenium-standalone-runner в конфиге hermione приводит к ошибке spawn selenium-standalone ENOENT(Windows 10)).
-   Команда для запуска тестов npm run hermione.

#### Другое

Папка client/dataForTests заглушка для модульного и интеграционного тестирования.
