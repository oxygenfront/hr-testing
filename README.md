# **Приложение для тестирования кандидатов**

## **Описание**

* [клиентская часть](./packages/client) - `react` приложение, сборщик `vite`
* [серверная часть](./packages/server) - `nest js` приложение, orm `prisma`, db `postgres`

---

## **Node js Yarn**

* для удобства переключения между версиями `node` и `yarn` - [**volta**](https://docs.volta.sh/guide/getting-started)
* текущие версии прописаны в [package.json](./package.json)

---

## **Установка зависимостей**

````bash
yarn
````

---

## **Environment Variables**

Значения в файлах переменных можно узнать у [контрибьютеров проекта](./package.json)

* [client env variables folder](./packages/client/) создайте файл `.env` с переменными: **SCREENING_HOST**, **SCREENING_PORT**, **SCREENING_SERVER_PORT**
* [server env variables folder](./packages/server/) создайте файл `.env` с переменными: **PORT**, **POSTGRES_USER**, **POSTGRES_PASSWORD**, **POSTGRES_DB**, **DATABASE_URL**, **DIRECT_URL**, **JWT_SECRET**

---

## **Запуск**

```bash
# build before first start

$ yarn build

# development
$ yarn start:dev

# production mode
$ yarn start:prod
```

---

## License

[MIT licensed](LICENSE)
