# 🧑‍🤝‍🧑 My Social Network App

Це простий соціальний застосунок, створений з використанням **React**, **Redux Toolkit**, **MUI**, **React Router**, **JSON Server**.

---

## 🚀 Швидкий старт

### 1. Встанови залежності
```bash
npm install
```

### 2. Запусти фейковий бекенд (json-server)
```bash
npm run start
```
> При запуску серверу шлях, має виглядати - Project\backend\jsonserver

> Запускає json-server для мокового API за замовчуванням на http://localhost:3000

### 3. Запусти фронтенд застосунок
```bash
npm run dev
```
> При запуску застосунку, шлях має виглядати -  Project\frontend\my-social-network-app

> Відкрий у браузері http://localhost:4000

## 📦 Команди

| Команда               | Опис                                                              |
|-----------------------|-------------------------------------------------------------------|
| `npm run start`       | Запускає JSON Server                                              |
| `npm run dev`         | Запускає застосунок у режимі розробки                             |
| `npm run build`       | Створює білд для продакшну                                        |
| `npm run preview`     | Локально переглядає білд                                          |
| `npm run lint`        | Перевіряє код з ESLint                                            |
| `npm run lint:start`  | Автоматично виправляє ESLint-помилки                              |
| `npm run prettier`    | Форматує код за допомогою Prettier                                |
| `npm run prod:server` | Форматує код за допомогою Prettier                                |

### Використані технології
- React 19
- Redux Toolkit
- Material UI
- React Router v7
- JSON Server
- ESLint + Prettier

## 🗂 Структура проєкту

```bash
src/
├── api/               # API для запитів
├── assets/            # Статичні ресурси
├── components/        # UI компоненти
├── layout/            # Компоненти для макетів (layout)
├── pages/             # Сторінки застосунку
├── router/            # Маршрутизатор
├── services/          # Запити, константи
├── store/             # Redux store і slice
├── App.jsx            # Основний компонент
├── AppWrapper.jsx     # Обгортка для додатка
└── main.jsx           # Точка входу      
```


### Автор
Nikita Shevtsiv
> Проєкт створено в рамках практики та навчання
> У планах: розширення функціоналу, деплой та реальні API