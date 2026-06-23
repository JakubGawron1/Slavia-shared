# Slavia-shared (deprecated)

> **Ten repozytorium jest wycofane (2026-06).** Nie używaj go w nowych integracjach.

## Zamienniki

| Było w shared | Teraz |
|---------------|--------|
| Katalogi JSON (presety, PZPC, odznaki) | Publiczne GET w **Slavia-backend**: `/api/system/theme-presets`, `/api/system/pzpc-weight-classes`, `/api/system/athlete-badges` |
| OpenAPI snapshot | **`Slavia-backend/src/embed/openapi.json`** — frontend: `pnpm openapi:types` |
| Logika TS (Sinclair, tor sztangi, proporcje, markdown) | **`Slavia-frontend/app/lib/slavia/`** |
| Logika Dart (Sinclair, odznaki) | **`Slavia-mobile/lib/utils/`** |
| Testy wektorowe | Frontend Vitest w `app/lib/slavia/`; mobile `test/sinclair_vector_test.dart` |

## Archiwum

Kod pozostaje w historii Git na wypadek audytu. Aktywny rozwój: **Slavia-backend**, **Slavia-frontend**, **Slavia-mobile**.
