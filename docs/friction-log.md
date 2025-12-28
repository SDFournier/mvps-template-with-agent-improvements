# Registro de fricciones y ambiguedades

Este documento registra toda friccion o ambiguedad encontrada en prompts,
analisis o implementaciones. Cada entrada debe incluir contexto, impacto,
propuesta y accion pendiente.

## Regla
Si durante un prompt se detecta una friccion o ambiguedad, se debe registrar
aca antes de cerrar el cambio.

## Template de entrada
- Fecha:
- Contexto / prompt:
- Descripcion de la friccion:
- Impacto potencial:
- Documentos afectados:
- Propuesta de mejora:
- Estado: pendiente / resuelto

## Entradas
- Fecha: 2025-12-25
  Contexto / prompt: simulacion de cambio (playbooks + contracts)
  Descripcion de la friccion: falta estandar de esquema de eventos y criterio
  claro para adoptar colas.
  Impacto potencial: implementaciones inconsistentes y drift de contratos.
  Documentos afectados: contracts, decision-log, playbooks
  Propuesta de mejora: definir formato de esquema de eventos y criterios para
  uso de colas.
  Estado: pendiente
- Fecha: 2025-12-25
  Contexto / prompt: analisis de arquitectura de coupon books con idempotencia
  Descripcion de la friccion: pnpm bloqueado por PowerShell policy y ejecucion
  de agent-finalize falla sin deps (jest no disponible) hasta correr
  pnpm.cmd install.
  Impacto potencial: validaciones obligatorias no corren en entornos Windows.
  Documentos afectados: testing, AGENTS
  Propuesta de mejora: documentar uso de pnpm.cmd o node scripts/agent-finalize,
  y aclarar prerequisitos de instalacion en Windows.
  Estado: resuelto (docs/testing.md, AGENTS.md)
- Fecha: 2025-12-27
  Contexto / prompt: seed y prueba manual de assignment/redemption
  Descripcion de la friccion: docker y mysql client no disponibles en PATH,
  impidiendo levantar infra y ejecutar seeds automaticamente.
  Impacto potencial: bloqueo para validaciones manuales por etapa.
  Documentos afectados: docs/testing.md, docs/flows/coupon-assignment-redemption.md
  Propuesta de mejora: agregar prerequisitos de infra local y comandos de
  verificacion de dependencias (docker/mysql).
  Estado: pendiente
