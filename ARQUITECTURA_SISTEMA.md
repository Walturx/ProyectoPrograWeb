# 🏗️ Arquitectura del Sistema - Frontend conectado al Backend

```
┌─────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                             │
│                    http://localhost:5173                             │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    VIEWS     │         │  COMPONENTS  │         │   CONTEXT    │
│              │         │              │         │              │
│ • Dashboard  │────────▶│ • Form_prod  │         │ • Carrito    │
│ • lista_prod │         │ • Usuarios   │         │ • Usuario    │
│ • mod_prod   │         │ • Ordenes    │         │              │
│ • Delete...  │         │              │         │              │
└──────────────┘         └──────────────┘         └──────────────┘
        │                         │                         │
        └─────────────────────────┼─────────────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │   SERVICES/API.JS        │
                    │  (Capa de Abstracción)   │
                    │                          │
                    │  • getProductos()        │
                    │  • createProducto()      │
                    │  • updateProducto()      │
                    │  • deleteProducto()      │
                    │  • getUsuarios()         │
                    │  • getOrdenes()          │
                    │  • loginUsuario()        │
                    │  • createOrden()         │
                    └──────────────────────────┘
                                  │
                                  │ HTTP Requests
                                  │ (fetch API)
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND API (Express.js)                        │
│                     http://localhost:3005                            │
└─────────────────────────────────────────────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   ROUTES     │         │ CONTROLLERS  │         │ REPOSITORIES │
│              │         │              │         │              │
│ Producto     │────────▶│ Producto     │────────▶│ Producto     │
│ Usuario      │         │ Usuario      │         │ Usuario      │
│ Orden        │         │ Orden        │         │ Orden        │
│ Carrito      │         │ Carrito      │         │ Carrito      │
└──────────────┘         └──────────────┘         └──────────────┘
                                                           │
                                                           │
                                                           ▼
                                                  ┌──────────────┐
                                                  │   MODELS     │
                                                  │  (Sequelize) │
                                                  └──────────────┘
                                                           │
                                                           ▼
                                                  ┌──────────────┐
                                                  │  PostgreSQL  │
                                                  │   Database   │
                                                  └──────────────┘
```

## 🔄 Flujo de Datos Completo

### Ejemplo: Crear un Producto

```
1. Usuario llena el formulario en Form_prod.jsx
   └─▶ handleSubmit() se ejecuta
   
2. Form_prod.jsx llama a createProducto(data)
   └─▶ Función en api.js
   
3. api.js hace fetch a http://localhost:3005/admin/productos/agregar
   └─▶ POST request con JSON body
   
4. Backend recibe en ProductoRoutes.js
   └─▶ router.post('/admin/productos/agregar', ...)
   
5. ProductoController.js procesa la petición
   └─▶ controller.create()
   
6. ProductoRepository.js interactúa con la BD
   └─▶ repository.create()
   
7. Sequelize crea el registro en PostgreSQL
   └─▶ INSERT INTO producto ...
   
8. Respuesta viaja de vuelta:
   PostgreSQL → Repository → Controller → Routes → api.js → Form_prod.jsx
   
9. Form_prod.jsx navega a /admin/productos
   └─▶ navigate('/admin/productos')
   
10. lista_prod.jsx carga y muestra el nuevo producto
    └─▶ useEffect() → AllProductos() → GET /admin/productos
```

## 📊 Endpoints Utilizados

### Productos
```
GET    /producto              → getProductos()
GET    /producto/:id          → getProductoById(id)
GET    /admin/productos       → AllProductos()
POST   /admin/productos/agregar → createProducto(data)
PUT    /admin/productos/modificar/:id → updateProducto(data)
DELETE /admin/productos/eliminar/:id → deleteProducto(id)
```

### Usuarios
```
GET    /usuario               → getUsuarios()
GET    /usuario/:id           → getUsuarioById(id)
POST   /usuario/login         → loginUsuario(credentials)
POST   /usuario/registrar     → createUsuario(data)
PUT    /usuario/:id/estado    → cambiarEstadoUsuario(id, estado)
PUT    /usuario/:id/password  → cambiarPasswordUsuario(id, ...)
```

### Órdenes
```
GET    /orden                 → getOrdenes()
GET    /orden/:id             → getOrdenById(id)
GET    /orden/usuario/:id     → getOrdenByIdUsuario(id)
POST   /orden                 → createOrden(data)
```

### Carrito
```
GET    /carrito/usuario/:id   → getCarritoByUsuario(id)
POST   /carrito               → crearCarrito(idusuario)
DELETE /carrito/:id           → eliminarCarrito(id)
```

### Items de Carrito
```
GET    /itemcarrito/carrito/:id → getItemsDeCarrito(id)
POST   /itemcarrito            → agregarItemCarrito(data)
DELETE /itemcarrito/:id        → eliminarItemCarrito(id)
```

## 🎯 Componentes Actualizados y sus Responsabilidades

| Componente | Responsabilidad | API Calls |
|------------|----------------|-----------|
| **Dashboard.jsx** | Vista principal admin, muestra estadísticas | `getUsuarios()`, `getOrdenes()` |
| **lista_prod.jsx** | Lista todos los productos con paginación | `AllProductos()` |
| **mod_prod.jsx** | Edita un producto existente | `getProductoById()`, `updateProducto()` |
| **Deleteproductpage.jsx** | Confirma y elimina un producto | `getProductoById()`, `deleteProducto()` |
| **Form_prod.jsx** | Crea un nuevo producto | `createProducto()` |

## ✅ Checklist de Verificación

Antes de probar, asegúrate de que:

- [ ] El backend está corriendo en `http://localhost:3005`
- [ ] La base de datos PostgreSQL está activa
- [ ] Las tablas están creadas correctamente
- [ ] CORS está configurado en el backend
- [ ] El frontend está corriendo en `http://localhost:5173`
- [ ] No hay errores en la consola del navegador
- [ ] No hay errores en la consola del backend

## 🧪 Cómo Probar

1. **Listar Productos**
   - Ir a `/admin/productos`
   - Debería cargar productos desde la BD

2. **Crear Producto**
   - Ir a `/admin/productos/agregar`
   - Llenar formulario y enviar
   - Verificar que aparece en la lista

3. **Editar Producto**
   - Click en ✏️ en la lista
   - Modificar datos y guardar
   - Verificar cambios en la lista

4. **Eliminar Producto**
   - Click en 🗑️ en la lista
   - Confirmar eliminación
   - Verificar que desaparece de la lista

5. **Dashboard**
   - Ir a `/admin/dashboard`
   - Verificar que muestra números reales de la BD

---

**Fecha**: 2025-11-30
**Autor**: Antigravity Assistant
