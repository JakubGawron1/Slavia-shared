# Slavia-shared

Wspólny kontrakt API, katalogi danych i czysta logika dla:

- **Slavia-frontend** (Nuxt / Vercel) — `@slavia/shared`
- **Slavia-mobile** (Flutter) — paczka `slavia_shared`

Backend (Rust / Render) pozostaje źródłem prawdy dla danych; ten repozytorium jest lustrem kontraktu i logiki klienckiej.

## Struktura

```
openapi/           # kanoniczny openapi.json (+ sha256)
data/              # JSON: motywy, odznaki, PZPC, proporcje, brand
src/logic/         # TypeScript: Sinclair, tor sztangi, ranking PZPC, proporcje
test-vectors/      # golden tests (TS + Flutter)
dart/              # paczka Flutter (slavia_shared)
scripts/           # sync OpenAPI, ekstrakcja ćwiczeń, assety Dart
```

## Skrypty

```bash
npm install
npm test                    # vitest (logika TS)
npm run openapi:sync        # z ../Slavia-backend
npm run data:extract-exercises
npm run dart:sync-assets    # kopiuje data/ → dart/assets/
```

## Integracja lokalna

Repozytoria obok siebie na dysku:

```
Desktop/
  Slavia-backend/
  Slavia-shared/    ← ten repo
  Slavia-frontend/  # "file:../Slavia-shared"
  Slavia-mobile/    # path: ../Slavia-shared/dart
```

### Frontend

```json
"@slavia/shared": "file:../Slavia-shared"
```

Po zmianie API: `pnpm openapi:snapshot` (zapis do `Slavia-shared/openapi/`) → `pnpm openapi:types`.

### Mobile

```yaml
slavia_shared:
  path: ../Slavia-shared/dart
```

```bash
cd ../Slavia-shared/dart && flutter test
```

## Deploy (Vercel / CI)

Na CI bez sąsiedniego folderu użyj **git submodule** lub zależności Git:

```json
"@slavia/shared": "github:ORG/Slavia-shared#main"
```

W repozytorium frontendu zacommituj pin wersji shared przy release.
