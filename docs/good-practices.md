# Buenas practicas - Front y Back

Este documento define principios generales y fuentes de verdad.
No reemplaza los playbooks ni los contratos; los referencia.

## Fuentes de verdad
- Playbooks: recetas repetibles por feature.
- Contracts: shapes estables de API y errores.
- Change checklist: proceso por cambio.
- Test matrix: cobertura requerida.
- Testing: tipos de test y ejecucion.
- Decision log y ADRs: por que de decisiones.

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
- Roles y permisos se validan siempre en backend.
- Cache, uploads y colas siguen el playbook correspondiente.

## Responsabilidades y SOLID (checks)
- SRP: un unico motivo de cambio por componente.
- OCP: extender sin modificar el nucleo cuando sea posible.
- ISP: interfaces pequenas y especificas.
- DIP: dependencias inyectadas, no instanciadas.

## Checklist operativo (resumen)
- Usar el Change Checklist para cada cambio.
- Tests segun Test Matrix.
- Ejecutar agent finalize al cerrar el prompt.
- Respuesta con formato obligatorio y referencias de codigo.
