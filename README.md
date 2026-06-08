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

**Dwa tryby** (ten sam remote Git):

| Tryb | Gdzie | Kto |
|------|-------|-----|
| Lokalny dev | `../Slavia-shared/` — osobny klon | Ty, mobile, skrypty OpenAPI |
| CI / Vercel / mobile release | **latest `main`** — submodule `--remote` lub shallow clone | Automatycznie przy każdym buildzie |

```
Desktop/
  Slavia-shared/          ← edycja na co dzień (git push stąd)
  Slavia-frontend/
    Slavia-shared/        ← submodule pod produkcję
  Slavia-mobile/          → ../Slavia-shared/dart
  Slavia-backend/
```

Po `git clone` frontendu: `git submodule update --init --recursive --remote` (lub `pnpm install` w frontendzie).

### Frontend

```json
"@slavia/shared": "file:./Slavia-shared"
```

Po zmianie API: `pnpm openapi:snapshot` (zapis do `Slavia-shared/openapi/`) → `pnpm openapi:types`.

### Mobile

```yaml
slavia_shared:
  path: ../Slavia-shared/dart
```

## Backend (Rust)

Rust nie uruchamia TS — może wczytywać **JSON** z `data/`:

- `theme-presets.json` — lista dozwolonych `ui_theme_preset` (zamiast tablicy w `admins.rs`)
- `pzpc-weight-classes.json` — format kategorii wagowych PZPC
- `athlete-badges.json`, wektory Sinclair — gdy logika przeniesie się na serwer

OpenAPI: backend **publikuje** `embed/openapi.json` → `pnpm openapi:snapshot` kopiuje do tego repo.

```bash
cd ../Slavia-shared/dart && flutter test
```

## Deploy (Vercel / CI)

Na CI bez sąsiedniego folderu użyj **git submodule** lub zależności Git:

```json
"@slavia/shared": "github:ORG/Slavia-shared#main"
```

Push na `main` wystarczy — frontend/mobile CI biorą najnowszy commit bez ręcznego bumpu.

### Automatyczne rebuildy zależnych repo

Workflow `dispatch-dependents.yml` (push na `main`) wysyła `repository_dispatch` do:

- `JakubGawron1/Slavia-Website` — pełny CI + opcjonalnie Vercel Deploy Hook
- `JakubGawron1/Slavia-Mobile` — `flutter analyze` + testy wektorów shared

**Sekrety w repo Slavia-shared** (Settings → Secrets → Actions):

| Sekret | Opis |
|--------|------|
| `SLAVIA_REPO_DISPATCH_TOKEN` | PAT z `repo` (lub fine-grained z dostępem do Website + Mobile) |

**Sekret w Slavia-Website** (opcjonalnie):

| Sekret | Opis |
|--------|------|
| `VERCEL_DEPLOY_HOOK` | URL z Vercel → Project → Settings → Git → Deploy Hooks |

Bez `VERCEL_DEPLOY_HOOK` CI na GitHub i tak się uruchomi; Vercel wymaga hooka lub osobnego pusha w repo frontendu.
