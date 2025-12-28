# Buenas practicas - Front y Back

Este documento define principios generales y fuentes de verdad.
No reemplaza los playbooks ni los contratos; los referencia.

## Proposito
Definir reglas base y criterios transversales para implementar cambios.

## Cuando usarlo
- Al iniciar cualquier cambio o feature.
- Cuando haya duda sobre estandares, responsabilidades o validaciones.

## Fuentes de verdad
- Playbooks: recetas repetibles por feature.
- Contracts: shapes estables de API y errores.
- Change checklist: proceso por cambio.
- Test matrix: cobertura requerida.
- Testing: tipos de test y ejecucion.
- Decision log y ADRs: por que de decisiones.
- Overview: indice de documentos canonicos e historicos.

## Ciclo de mejora (obligatorio)
1) Revisar documentacion existente.
2) Implementar el cambio.
3) Extraer aprendizajes y actualizar docs.
4) Propagar la mejora cuando aplique.

## Principios base
- Separar responsabilidades: UI, datos, orquestacion y negocio.
- DTOs compartidos entre front y back.
- Error contract consistente.
- SOLID como regla de diseno.
- Configuracion por env con defaults razonables.
- Observabilidad minima sin datos sensibles.
- Observabilidad por niveles: LOG_DETAIL_LEVEL 1/2/3 para pasos y explicaciones.
- Pedagogia iterativa: cada 4 prompts, generar quizzes avanzados y
  actualizar el banco de quizzes (docs/learning/quiz-bank.md) con
  preguntas nuevas o refinadas; cualquier pregunta del usuario o supuesto
  incorrecto es candidato para quiz y debe registrarse como origen.
- Cadencia de quizzes: cada 4 prompts se deben hacer 3 preguntas sacadas
  del quiz bank, con formatos variados (no solo multiple choice).

## Frontend (Next)
- UI solo presenta estado y dispara acciones.
- Acceso a API centralizado en un solo cliente.
- Estados de carga y error siempre visibles.
- SSR safe: no tocar storage en render sin chequear entorno.
- Reuso: extraer hooks y componentes cuando crece una pantalla.

## Backend (Nest)
- Modulos por dominio con controller + service.
- Validar input en controllers antes de la logica de negocio.
- Services con logica de negocio, sin orquestacion de HTTP.
- Acceso a datos (DB/Redis) en repositorios o adaptadores, fuera de services.
- Roles y permisos se validan siempre en backend.
- Cache, uploads y colas siguen el playbook correspondiente.
- Documentar APIs con OpenAPI (Swagger) y mantener DTOs anotados.

## Responsabilidades y SOLID (checks)
- SRP: un unico motivo de cambio por componente.
- OCP: extender sin modificar el nucleo cuando sea posible.
- ISP: interfaces pequenas y especificas.
- DIP: dependencias inyectadas, no instanciadas.

## Checklist operativo (resumen)
- Usar el Change Checklist para cada cambio.
- Tests segun Test Matrix.
- Cada etapa debe dejar una validacion manual concreta, con pasos y logs
  esperados (LOG_DETAIL_LEVEL 2/3) documentados en el flow o runbook.
- Ejecutar agent finalize al cerrar el prompt.
- Respuesta con formato obligatorio y referencias de codigo.

## Referencias canonicas
- docs/change-checklist.md
- docs/feature-playbooks.md
- docs/contracts.md
- docs/testing.md
