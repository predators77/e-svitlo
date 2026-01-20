# svitlo-mvp (Закарпаття)

MVP-сайт "Чи є світло?" на Next.js (App Router) + дані у JSON.

## Запуск локально

```bash
npm i
npm run dev
```

## Деплой на Vercel

1) Завантаж цей проєкт у GitHub
2) Vercel → New Project → Import репозиторій → Deploy

## Де міняти дані

- Список міст: `data/index.json`
- Графіки: `data/schedules/zakarpattia/<місто>.json`

> Увага: в MVP вшиті *демо-графіки*, не офіційні.

## Важливо про sitemap

Файл `app/sitemap.ts` зараз містить `https://example.com`. Після деплою заміни на свій домен.
