# Relative Clauses - Interactive Learning App

Una aplicación educativa interactiva para aprender y practicar oraciones de relativo en inglés.

## 🎯 Características

- ✅ 50 ejercicios autocorregibles
  - 10 Multiple Choice
  - 20 Fill-in-the-Gaps
  - 20 Rephrasing
- 📚 Teoría completa sobre relative clauses
- 📊 Sistema de puntuación parcial por secciones
- 🎓 Requisito de 90% en cada sección para aprobar
- ⚡ Feedback inmediato para cada ejercicio
- 📈 Panel de puntuación en tiempo real
- 🔄 Navegación fluida sin perder datos
- 📱 Diseño responsivo (móvil y desktop)

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador
2. Ingresa tu nombre, apellido y curso
3. Estudia la teoría o comienza con los ejercicios
4. Los datos se guardan en memoria durante la sesión
5. Al terminar, verás tu puntuación final

## 📁 Estructura del proyecto

```
relative-clauses-app/
├── index.html          # Estructura HTML principal
├── style.css           # Estilos CSS (diseño responsivo)
├── app.js              # Lógica principal de la aplicación
├── data.js             # Contenido de teoría y ejercicios
├── README.md           # Este archivo
└── .gitignore          # Archivos a ignorar en Git
```

## 🌐 Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor ni instalación
- No requiere conexión a internet después de cargar

## 📖 Contenido del App

### Pantalla de Login
- Entrada de nombre, apellido y curso
- Validación de datos

### Menú Principal
- Acceso a Teoría
- Acceso a Ejercicios
- Navegación fluida

### Sección de Teoría
- Introducción a Relative Clauses
- Defining vs Non-Defining Clauses
- Relative Pronouns (who, which, that, whose, whom)
- Relative Adverbs (when, where, why)
- Explicaciones en inglés con traducciones al español
- Ejemplos prácticos

### Sección de Ejercicios
- **Multiple Choice**: 10 ejercicios con 4 opciones cada uno
- **Fill-in-the-Gaps**: 20 ejercicios para completar
- **Rephrasing**: 20 ejercicios de combinación de oraciones
- Navegación rápida entre secciones
- Panel de puntuación en tiempo real
- Feedback inmediato (correcto/incorrecto)
- Explicaciones detalladas
- Botones para navegar anterior/siguiente

### Sección de Resultados
- Puntuaciones parciales por sección:
  - Multiple Choice: /20
  - Fill-in-the-Gaps: /40
  - Rephrasing: /40
- Puntuación total: /100
- Porcentajes por sección
- Indicadores visuales (✓/✗)
- Mensaje de aprobación o recomendación
- Opciones para repetir o volver al menú

## 🔧 Sistemas de Corrección

### Multiple Choice
- Comparación directa con respuesta correcta
- Aceptación de múltiples variantes válidas

### Fill-in-the-Gaps
- Normalización de respuestas (minúsculas, sin puntuación)
- Aceptación de múltiples respuestas correctas
- Tolerancia con espacios y caracteres especiales

### Rephrasing
- Comparación flexible de estructuras
- Normalización completa de texto
- Aceptación de múltiples formas válidas
- Fuzzy matching para respuestas equivalentes

## 📊 Sistema de Puntuación

### Cálculo de Puntos
- Cada ejercicio = 2 puntos
- Total = 100 puntos

### Requisito de Aprobación
- **OBLIGATORIO 90% en CADA sección**:
  - Multiple Choice: ≥ 18/20 (90%)
  - Fill-in-the-Gaps: ≥ 36/40 (90%)
  - Rephrasing: ≥ 36/40 (90%)
- El alumno aprueba SOLO si cumple con las tres condiciones

## 🎨 Diseño

- Interfaz moderna y limpia
- Colores profesionales
  - Azul marino: principal (#1e3a8a)
  - Verde: teoría (#10b981)
  - Naranja: ejercicios (#f97316)
  - Amarillo: home (#fbbf24)
- Responsive design
- Tipografía clara y legible
- Animaciones suaves
- Contraste adecuado para accesibilidad

## 🚀 Despliegue en GitHub Pages

1. Sube este repositorio a GitHub
2. Ve a Settings → Pages
3. Selecciona Branch: main
4. Tu app estará en: `https://tu-usuario.github.io/relative-clauses-app/`

## 💾 Almacenamiento de Datos

- Los datos se guardan **en memoria** durante la sesión
- **NO usa localStorage**, cookies ni base de datos
- Los datos se pierden al cerrar el navegador (comportamiento intencional)
- Cada nuevo login inicia una nueva sesión limpia

## 📝 Notas de Desarrollo

- Aplicación vanilla JavaScript (sin frameworks)
- Single Page Application (SPA)
- CSS Grid y Flexbox para layout responsivo
- Gestión de estado local
- Funcionalidad completa sin dependencias externas

## 👨‍🏫 Para Docentes

Esta aplicación es ideal para:
- Enseñanza de gramática inglesa
- Evaluación formativa
- Autoaprendizaje de estudiantes
- Práctica de relative clauses
- Seguimiento de progreso

## 📄 Licencia

Libre para uso educativo

## 👤 Autor

Creado para estudiantes de ESO y Bachillerato

---

**¿Preguntas o sugerencias?** Siéntete libre de crear un issue en el repositorio.
