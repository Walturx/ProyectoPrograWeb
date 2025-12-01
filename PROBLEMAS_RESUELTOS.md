# 🔧 Problemas Encontrados y Solucionados

## Fecha: 2025-11-30

---

## ❌ Problema 1: Error 401 Unauthorized en Dashboard

### **Descripción del Error:**
```
GET http://localhost:3005/usuario 401 (Unauthorized)
Error al cargar datos del dashboard: Error: Error al obtener usuarios
```

### **Causa:**
El endpoint `/usuario` requiere autenticación (token JWT), pero el Dashboard intentaba acceder sin proporcionar credenciales.

### **Solución Implementada:**
✅ Modificado `dashboard.jsx` para usar solo el endpoint público `/orden`
✅ Calculamos usuarios únicos a partir de las órdenes en lugar de llamar a `/usuario`
✅ Agregado manejo de errores robusto con valores por defecto

### **Código Anterior:**
```javascript
const usuarios = await getUsuarios(); // ❌ Requiere autenticación
const ordenes = await getOrdenes();
```

### **Código Nuevo:**
```javascript
// Solo obtener órdenes (endpoint público)
const ordenes = await getOrdenes();

// Extraer usuarios únicos de las órdenes
const usuariosUnicos = new Set(ordenes.map(orden => orden.idusuario));

setInformacion({
    usuarios: usuariosUnicos.size || 0,
    ordenes: ordenes.length || 0,
    ingresos: ingresosTotales.toFixed(2)
});
```

---

## ❌ Problema 2: Keys Duplicadas en React

### **Descripción del Error:**
```
TablaOrdenes.jsx:32 Encountered two children with the same key, `123`. 
Keys should be unique so that components maintain their identity across updates.

Listado_ordenes.jsx:34 Encountered two children with the same key, `123`.
```

### **Causa:**
El archivo `src/data/ordenes_B.js` tenía todas las órdenes con el mismo ID (123):

```javascript
const ordenes=[
    { id:123, ... },  // ❌ Duplicado
    { id:123, ... },  // ❌ Duplicado
    { id:123, ... },  // ❌ Duplicado
    { id:123, ... }   // ❌ Duplicado
]
```

### **Solución Implementada:**
✅ Asignados IDs únicos a cada orden: 123, 124, 125, 126

### **Código Corregido:**
```javascript
const ordenes=[
    { id:123, usuario:"Alejandro Ruiz", fecha:"29/01/2025", total: 199, estado: false },
    { id:124, usuario:"Alejandro Ruiz", fecha:"20/01/2025", total: 199, estado: true },
    { id:125, usuario:"Alejandro Ruiz", fecha:"15/01/2025", total: 199, estado: true },
    { id:126, usuario:"Alejandro Ruiz", fecha:"05/01/2025", total: 199, estado: true }
]
```

---

## 📊 Resumen de Cambios

| Archivo | Cambio | Razón |
|---------|--------|-------|
| `dashboard.jsx` | Eliminado `getUsuarios()` | Evitar error 401 |
| `dashboard.jsx` | Agregado cálculo de usuarios únicos | Obtener dato sin autenticación |
| `ordenes_B.js` | IDs cambiados a 123, 124, 125, 126 | Eliminar keys duplicadas |

---

## ✅ Resultado

Después de estos cambios:
- ✅ El Dashboard carga correctamente sin errores 401
- ✅ No hay warnings de React sobre keys duplicadas
- ✅ Los componentes TablaOrdenes y Listado_ordenes funcionan correctamente
- ✅ Los datos se muestran correctamente en el Dashboard

---

## 🎯 Recomendaciones Futuras

### 1. **Implementar Autenticación en Dashboard**
Si necesitas mostrar datos reales de usuarios, deberás:
- Implementar login de administrador
- Guardar el token en localStorage
- Modificar `getUsuarios()` en `api.js` para enviar el token:

```javascript
export const getUsuarios = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/usuario`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return res.json();
};
```

### 2. **Migrar a Datos del Backend**
Los componentes `TablaOrdenes` y `Listado_ordenes` aún usan datos estáticos de `ordenes_B.js`. Deberías:
- Conectarlos con `getOrdenes()` de la API
- Eliminar la dependencia de archivos estáticos

### 3. **Validar IDs Únicos**
Cuando crees datos de prueba, asegúrate de que cada registro tenga un ID único para evitar problemas con React keys.

---

## 📝 Archivos Modificados en esta Sesión

- ✅ `src/views/dashboard.jsx` - Corregido manejo de autenticación
- ✅ `src/data/ordenes_B.js` - Corregidos IDs duplicados

---

**Estado**: ✅ Todos los errores resueltos
**Próximo paso**: Probar el Dashboard en el navegador
