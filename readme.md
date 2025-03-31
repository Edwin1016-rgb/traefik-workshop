```markdown
# Configuración de Traefik con Docker Compose

## Integrantes del Grupo
- Nombre Apellido 1
- Nombre Apellido 2 
- Nombre Apellido 3

## Flujo de Tráfico en Traefik

El flujo de solicitudes sigue este proceso:

1. **Entrada por EntryPoints** (puertos 80/443)
2. **Procesamiento por Routers** (evalúa reglas de enrutamiento)
3. **Aplicación de Middlewares** (seguridad/transformaciones)
4. **Direccionamiento a Services** (backends finales)
5. **Retorno de Respuestas** al cliente

## Middlewares Implementados

### auth-admin
```yaml
middlewares:
  auth-admin:
    basicAuth:
      users:
        - "admin:$hashed_password"
```

### ipwhitelist  
```yaml
ipwhitelist:
  ipWhiteList:
    sourceRange:
      - "127.0.0.1/32"
      - "192.168.1.0/24"
```

### rate-limit
```yaml 
rateLimit:
  average: 100
  burst: 50
```

## Preguntas

### 1. ¿Cómo detecta Traefik los servicios en Docker Compose?

Traefik utiliza el proveedor Docker que monitorea el socket (`/var/run/docker.sock`). Requiere:

- `traefik.enable=true` en labels
- `exposedByDefault: false` en configuración
- Labels adicionales para rutas

### 2. ¿Qué función tienen los middlewares?

| Función               | Ejemplos                     |
|-----------------------|-----------------------------|
| Seguridad             | Auth, IP whitelisting       |
| Transformación        | Headers, paths              |
| Control de tráfico    | Rate limiting, redirecciones|

### 3. ¿Cómo se define un router?

Parámetros esenciales:
```markdown
1. `rule`: "Host(`dominio.com`) && Path(`/ruta`)"
2. `entryPoints`: ["web", "websecure"]  
3. `service`: "nombre-backend"
4. `middlewares`: ["auth", "rate-limit"]
5. `tls`: {} (para HTTPS)
```

### 4. Diferencia entre Router y Service

**Router**:
- Define condiciones de enrutamiento
- Aplica middlewares
- Maneja reglas de acceso

**Service**:
- Configura conexión al backend
- Balanceo de carga
- Configuración de health checks

### 5. ¿Cómo agregar más reglas de enrutamiento?

**Ejemplo para múltiples rutas:**
```yaml
routers:
  api:
    rule: "Host(`api.com`) && PathPrefix(`/v1`)"
    service: api-v1
    
  admin:
    rule: "Host(`api.com`) && PathPrefix(`/admin`)"
    service: admin
    middlewares: ["auth"]
```