# Iteracion 1 - Making Common Implementations Docs

Documento historico. No agregar reglas nuevas aca.
Usar Good Practices, Playbooks, Contracts y Test Matrix como fuentes de verdad.

## Alcance implementado
- Auth con sesiones persistidas y control de expiracion.
- CRUD de libros con paginacion y busqueda.
- Validaciones de entrada con helpers simples.
- Manejo de errores uniforme.
- Consumo de API desde el front (login + CRUD).

## Lecciones y consideraciones
- DTOs compartidos reducen bugs de integracion.
- Hooks en front permiten reuso y simplifican tests.
- Validaciones simples sirven para MVP, revisar cuando crezca el dominio.
- Error contract consistente mejora la DX.

## Anti-patrones observados
- Fetch directo desde pantallas sin cliente central.
- Mezclar validacion y logica de negocio en services.
- No definir limites de paginacion.
- Duplicar DTOs entre front y back.

## Referencias canonicas
- docs/good-practices.md
- docs/feature-playbooks.md
- docs/contracts.md
- docs/test-matrix.md
