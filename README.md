# Park Explorer

מונוריפו (Turborepo) עם לקוח ושרת מחוברים ב-tRPC, מוקלד מקצה לקצה.

- **`apps/web`** — Vite + React 19 + TypeScript, Tailwind CSS v4, shadcn/ui
- **`apps/api`** — NestJS + `nestjs-trpc` (tRPC דרך מערכת המודולים של Nest) + Drizzle ORM מול Postgres (Neon)

פרויקט לימוד — לפירוט מלא על הארכיטקטורה, ההחלטות ולמה, ומדריך לעבור על הקוד בעצמך, ראו [מדריך-הפרויקט-שלבים-א-ב.md](docs/מדריך-הפרויקט-שלבים-א-ב.md) (מקומי — התיקייה `docs/` מסוננת מ-git).

## התקנה

```bash
npm install
```

צריך גם `apps/api/.env` עם ארבעה משתנים (ראו `apps/api/.env.example`):

```
DATABASE_URL=            # Neon, pooled — לשרת בזמן ריצה
DATABASE_URL_UNPOOLED=   # Neon, direct — למיגרציות
JWT_SECRET=              # סוד לחתימת טוקנים — חובה, השרת לא עולה בלעדיו
PORT=                    # ברירת מחדל 3000
```

## פקודות עיקריות (מהשורש)

```bash
npm run dev              # מריץ web+api יחד
npm run build            # בונה את שתי האפליקציות
npm run lint             # eslint
npm run check-types      # בדיקת טיפוסים בלי build

npm run trpc:generate    # מרענן את חוזה tRPC ללקוח — אחרי כל שינוי ב-@Query/@Mutation

npm run db:generate      # מפיק SQL ממודל הסכמה (drizzle)
npm run db:migrate       # מריץ מיגרציות מול Neon
npm run db:seed          # מאתחל אזורים וערים
npm run db:studio        # Drizzle Studio — עיון חזותי במסד
```

## מבנה נתונים

`Region → City → Park → ParkImage`, ועוד `User` כיוצר של פארק. פירוט מלא, כולל דיאגרמת ER וטבלת החלטות ארכיטקטוניות, ב-[מדריך-הפרויקט-שלבים-א-ב.md](docs/מדריך-הפרויקט-שלבים-א-ב.md#5-דיאגרמת-מודל-הנתונים-er).
