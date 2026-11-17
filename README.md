# Navidad Familia Marín González

App (PWA) de la familia para la Navidad 2026 — Vibras Positivas HM.

## Cómo alimentar la agenda
Todas las actividades viven en `actividades.json`. Para agregar una, copie un bloque y cambie:
- `id`: nombre corto sin espacios (ej. `buñuelos` → `bunuelos`)
- `estado`: `hecho`, `proximo` o `por-definir`
- `fecha`: `AAAA-MM-DD` (o `null` si aún no hay fecha) y opcional `fechaFin`, `hora` (24 h, hora de Colombia)
- `titulo` y `detalle` en español (`es`) e inglés (`en`)
- `foto`: ruta de una foto en `img/` y, si hay varias, `fotos: [...]`

La app calcula sola qué está "Hoy", cuántos días faltan y pasa a "Ya la vivimos" lo que ya ocurrió (hora de Colombia).
Las propuestas de la familia llegan por WhatsApp a Harold desde la sección "Proponer una actividad".
