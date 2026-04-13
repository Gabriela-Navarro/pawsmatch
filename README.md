# 🐾 PawsMatch

> Tinder for Pets — Encuentra a tu compañero perfecto

PawsMatch es una aplicación de adopción de mascotas con interfaz tipo Tinder, construida como parte del curso **AI Native Dev** de Universidad Galileo (Week 1).

## ¿Qué es AI-Native?

En lugar de escribir código manualmente, el desarrollador **orquesta modelos de IA** para escribir código, debuggear y hacer tests. El desarrollador deja de ser solo un "coder" y se convierte en un "Apply-er of Intelligence".

## ✨ Features

- 🐕 Catálogo de 15 mascotas con fotos (perros, gatos, conejos y aves)
- ❤️ Sistema de match/like con swipe (mouse y táctil para móvil)
- 🔍 Filtros por tipo de mascota
- 📍 Filtros por ubicación (Ciudad de Guatemala, Antigua Guatemala, Quetzaltenango, Sololá, Cobán)
- ⚡ Matches persistentes — no se borran al cambiar filtros
- ♿ Accesible — botones con aria-labels para lectores de pantalla
- 💎 Diseño moderno, limpio y mobile-first
- ✅ 14 tests automatizados con Vitest
## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — styling
- **Vitest** + **Testing Library** — testing

## 🚀 Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Correr tests
npm run test

# Build para producción
npm run build
```

## 🧪 Tests

El proyecto incluye 14 tests automatizados que cubren:
- Renderizado de PetCard
- Interacciones de like/pass
- Lógica de filtros por tipo y ubicación
- Panel de matches

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── PetCard.tsx       # Tarjeta swipeable de mascota
│   ├── FilterBar.tsx     # Filtros por tipo y ubicación
│   └── MatchPanel.tsx    # Panel de matches y pasados
├── hooks/
│   └── usePetStack.ts    # Hook que maneja el stack de tarjetas
├── services/
│   └── petService.ts     # Lógica de filtrado y fetch
├── data/
│   └── pets.ts           # Datos de las 15 mascotas
├── types/
│   └── index.ts          # TypeScript interfaces
└── test/
    └── PawsMatch.test.tsx
```

## ⚡ Pre-fetch Buffer

Una de las decisiones técnicas clave del proyecto. En una app tipo Tinder, esperar 1-2 segundos entre swipes arruina la experiencia. La solución es mantener un buffer de mascotas cargadas en memoria:

1. El usuario hace swipe
2. La mascota actual se mueve a "liked" o "passed"
3. En segundo plano ya está lista la siguiente
4. Resultado: cero latencia entre tarjetas

## 🤖 Técnicas de Prompting utilizadas

| Técnica | Uso en el proyecto |
|---|---|
| **Zero-Shot** | Preguntas simples al modelo sin ejemplos |
| **Few-Shot** | Definir el estilo de los componentes con ejemplos |
| **Context-Augmented** | Pasar documentación de React/Tailwind al modelo |
| **Chain of Thought** | Planificar la arquitectura paso a paso |
| **ReAct** | Refactorizar múltiples archivos en un solo ciclo |
| **Feedback Loop** | Corregir errores pasando el stack trace al modelo |

---


