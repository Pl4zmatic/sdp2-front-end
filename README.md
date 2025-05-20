# Applicatie
Dit is een [Next.js](https://nextjs.org) project bootstrapped met [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Dit project gebruikt voornamelijk [Shadcn](https://ui.shadcn.com/) als component library en [Tailwind](https://tailwindcss.com/) voor snelle css styling.

## Before
Gelieve een terminal open te doen om de volgende stappen te kunnen uitvoeren, dit allemaal zal gebeuren in de folder **2025-react-gent2**.

## Dependencies
Om nodige dependecies te installeren, gebruik:
```bash
npm install
```
## Environment

Hiervoor kan je een **.env** file maken in de root van het project dus:

```
2025-react-gent2
    |
    - ...
    - api
    - app
    - ...
    - .env
```
En ziet er als volgt uit:
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyATaM2lc81FB86XfU2iM3ZuDNnofKei_mw
NEXT_PUBLIC_API_URL=http://localhost:4000
```
NEXT_PUBLIC_API_URL is de **URL** waar de bijhorende **API** van dit project loopt, dit kunt u aanpassen aan uw noden.

## Run
Om het te laten lopen:
### In Development
Gebruik in terminal:
```bash
npm run dev
```

### In Productie
Gebruik in terminal:
```bash
npm run build; npm run start
```

Dan zal de service op http://localhost:3000 lopen.
