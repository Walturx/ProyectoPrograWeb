# 🎨 Guía de Nomenclatura CSS para Evitar Conflictos con Tailwind

## Problema Identificado
Varias clases CSS genéricas están chocando con las utilidades de Tailwind CSS.

## Estrategia de Solución

### **1. Usar Prefijos Específicos por Componente**

En lugar de usar clases genéricas como:
- ❌ `.container`
- ❌ `.button`
- ❌ `.card`
- ❌ `.header`

Usar prefijos específicos:
- ✅ `.detalle-orden__container`
- ✅ `.dashboard__card`
- ✅ `.usuario__header`

### **2. Nomenclatura BEM (Block-Element-Modifier)**

**Formato:**
```
.componente__elemento--modificador
```

**Ejemplos:**
```css
/* Block */
.detalle-orden { }

/* Element (hijo del bloque) */
.detalle-orden__header { }
.detalle-orden__body { }
.detalle-orden__footer { }

/* Modifier (variante del bloque o elemento) */
.detalle-orden--entregado { }
.detalle-orden__status--pendiente { }
```

### **3. Evitar Selectores de Etiquetas Globales**

❌ **Evitar:**
```css
h1 { font-size: 2rem; }
table { width: 100%; }
td { padding: 1rem; }
```

✅ **Usar:**
```css
.detalle-orden__title { font-size: 2rem; }
.detalle-orden__table { width: 100%; }
.detalle-orden__table-cell { padding: 1rem; }
```

### **4. Lista de Clases a Renombrar**

| Archivo | Clase Original | Nueva Clase |
|---------|---------------|-------------|
| `Detalles_Ordenes.css` | `.container` | `.detalle-orden__container` |
| `Detalles_Ordenes.css` | `.order-card` | `.detalle-orden__card` |
| `Detalles_Ordenes.css` | `.order-header` | `.detalle-orden__header` |
| `Detalles_Ordenes.css` | `.order-info` | `.detalle-orden__info` |
| `Detalles_Usuarios.css` | `.container` | `.detalle-usuario__container` |
| `Dashboard.css` | `.dashboard` | `.admin-dashboard` |
| `Dash.css` | `.dashboard` | `.dash__container` |
| `Dash.css` | `.dashboard-card` | `.dash__card` |

### **5. Clases que NO deben usarse (Conflicto con Tailwind)**

```
container, flex, grid, block, inline, hidden,
text-*, bg-*, border-*, p-*, m-*, w-*, h-*,
rounded-*, shadow-*, font-*, etc.
```

### **6. Archivos Prioritarios a Actualizar**

1. ✅ `Detalles_Ordenes.css`
2. ✅ `Detalles_Usuarios.css`
3. ✅ `Dashboard.css`
4. ✅ `Dash.css`
5. ✅ `Login.css`
6. ✅ `Registro.css`
7. ✅ `Form_prod.css`
8. ✅ `tablas.css`

---

## Ejemplo de Refactorización

### Antes (❌):
```css
.container {
  max-width: 1000px;
  margin: auto;
}

.card {
  background: white;
  padding: 20px;
}

h1 {
  font-size: 2rem;
}
```

### Después (✅):
```css
.detalle-orden__container {
  max-width: 1000px;
  margin: auto;
}

.detalle-orden__card {
  background: white;
  padding: 20px;
}

.detalle-orden__title {
  font-size: 2rem;
}
```

---

## Implementación en JSX

### Antes (❌):
```jsx
<div className="container">
  <div className="card">
    <h1>Título</h1>
  </div>
</div>
```

### Después (✅):
```jsx
<div className="detalle-orden__container">
  <div className="detalle-orden__card">
    <h1 className="detalle-orden__title">Título</h1>
  </div>
</div>
```

---

**Estado**: 🚧 En progreso
**Siguiente paso**: Actualizar archivos CSS uno por uno
