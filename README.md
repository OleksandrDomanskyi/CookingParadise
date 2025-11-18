# Coocking Paradise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## Setup

1. `cp .env.example .env` and make your changes if you need
2. `npm install`
3. `npm run start` — runs `generate-env` and `ng serve`

## Lint & Format

- `npm run lint`
- `npm run format`

## Run Tests

- `npm run test`

## Architecture

- Standalone components
- `AuthService`, `RecipeService` — Each microservice has its own API endpoints.
- Pages: LoginPage, RecipesPage, RecipeDetailsPage, ErrorPage
