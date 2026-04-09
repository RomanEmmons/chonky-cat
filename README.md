# Chonky Cat 🐱

A location-based pet adoption app that helps users find overweight cats available for adoption near them. Enter a zip code, get connected to big cats who need a home.

## How it works

Users enter a 5-digit zip code and the app queries a local database of cats sourced from the Petfinder API and a custom web scraper. Results are filtered by location using a zip code dataset backed by MySQL, and cat records are stored and served via MongoDB.

## Tech stack

- **Backend:** Node.js, Express
- **Databases:** MongoDB (cat records), MySQL (zip code data)
- **Frontend:** React, Webpack, Babel
- **Data sourcing:** Petfinder API (`@petfinder/petfinder-js`), Cheerio web scraper
- **Other:** Axios, CORS, Nodemon

## Project structure

```
chonky-cat/
├── controllers/     # Route handler logic
├── database/        # MongoDB connection and models
├── server/          # Express server and route definitions
├── seed/            # Database seeding scripts for cat records
├── zipcodes/        # MySQL zip code dataset and seeding
├── src/             # React frontend source
├── public/          # Bundled frontend output
└── scraper.js       # Web scraper for sourcing cat data
```

## Architecture notes

The app separates concerns across three distinct layers. The **data layer** has two databases: MongoDB stores cat records with adoption metadata, while MySQL handles zip code-to-location lookups. The **controller layer** mediates between route definitions and database queries, keeping the server clean. The **seed pipeline** has two separate scripts — one for cat records (`seed/seed.js`) and one for the zip code dataset (`zipcodes/database/seed.js`) — making it easy to refresh either data source independently.

## Getting started

**Prerequisites:** Node.js, MongoDB, MySQL

**Install dependencies:**
```bash
npm install
```

**Set up environment variables** — create a `.env` file in the root with your Petfinder API credentials and database connection strings.

**Seed the databases:**
```bash
# Seed cat records
npm run seed

# Seed zip code data
npm run zip:seed
```

**Run in development:**
```bash
# In one terminal — start the React dev build watcher
npm run react:dev

# In another terminal — start the Express server
npm run server:dev
```

The app will be available at `http://localhost:3000`.

## Key dependencies

| Package | Purpose |
|---|---|
| `@petfinder/petfinder-js` | Petfinder API client for sourcing adoptable cats |
| `cheerio` | HTML parsing for web scraping |
| `mongoose` | MongoDB ODM for cat records |
| `mysql` | MySQL client for zip code lookups |
| `axios` | HTTP requests |
| `express` | Web server framework |

## Author

[Roman Emmons](https://github.com/RomanEmmons)
