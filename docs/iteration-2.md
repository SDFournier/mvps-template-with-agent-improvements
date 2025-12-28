# Iteracion 2 - Tablas, cache, uploads, logging y roles

Documento historico. No agregar reglas nuevas aca.
Usar Good Practices, Playbooks, Contracts y Test Matrix como fuentes de verdad.
Ver el indice en docs/00-overview.md para contexto historico.

Historical note: this document is context only. Do not use it as a source
of truth.

## Alcance implementado
- Tabla con paginacion para listados.
- Cache en backend con expiracion e invalidacion en escrituras.
- Upload de archivos con almacenamiento local y metadata.
- Logging de requests para observabilidad basica.
- Roles y autorizacion por permisos en endpoints sensibles.

## Lecciones y consideraciones
- Listados deben tratarse como patron reutilizable.
- Cache debe tener TTL e invalidacion explicita.
- Uploads requieren validar limites y origen siempre.
- Roles deben modelarse como parte de la identidad del usuario.
- Logging basico permite diagnostico rapido de MVPs.
- Smoke tests detectan errores de wiring temprano.

## Anti-patrones observados
- Paginacion sin limites o sin control del backend.
- Cache sin invalidacion al mutar datos.
- Uploads sin limites de tamano o sin metadata persistida.
- Logging excesivo con datos sensibles.
- Roles validados solo en el front.

## Canonical refs only
Do not treat this document as rules. Use these sources of truth:
- docs/good-practices.md
- docs/feature-playbooks.md
- docs/contracts.md
- docs/test-matrix.md
