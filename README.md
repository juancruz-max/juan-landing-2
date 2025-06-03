# Cromax Academy - Landing Page

## Descripción

Landing page para "Cromax Academy", una academia de marketing digital que enseña desde cero una de las profesiones más rentables para generar ingresos por internet. Diseño moderno, responsive, con animaciones sutiles y panel de administración para editar contenido.

## Tecnologías

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion (animaciones)
- JSON para contenido editable

## Colores de la Marca

- Primario: #22c55e (verde)
- Secundario: Negro (#000000)

## Estructura de la Landing Page

1. **Hero** - Impacto inicial con propuesta de valor
2. **Audience** - Para quién es la formación
3. **Benefits** - Qué lograrás con el curso
4. **Modules** - Contenido del curso
5. **Extras** - Beneficios adicionales
6. **Testimonials** - Casos de éxito
7. **Pricing** - Precio y llamada a la acción
8. **Instructor** - Sobre Juan Cruz Cummaudo
9. **FAQ** - Preguntas frecuentes

## Características

- **Estilo:** Moderno y profesional con tipografía legible (Inter) y espacios amplios
- **Responsive:** Adaptable a móviles, tablets y desktops usando TailwindCSS
- **Animaciones:** Entrada suave de secciones (fade-in), hover en botones, y efectos sutiles de fondo

## Panel de Administración

- Ruta: `/admin`
- Funcionalidad: Formulario para editar el contenido de cada sección almacenado en `content.json`
- Almacenamiento: JSON en `data/content.json`

## Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start
```

## Estructura de Archivos

```
juan-landing-2/
├── app/
│   ├── admin/          # Panel de administración
│   ├── api/            # API routes
│   ├── layout.tsx      # Layout principal
│   └── page.tsx        # Página principal
├── components/         # Componentes React
│   ├── Audience.tsx    # Sección de audiencia objetivo
│   ├── Benefits.tsx    # Beneficios del curso
│   ├── Modules.tsx     # Módulos del curso
│   ├── Extras.tsx      # Beneficios adicionales
│   ├── Pricing.tsx     # Sección de precios
│   ├── Instructor.tsx  # Información del instructor
│   └── ...
├── data/
│   └── content.json    # Contenido editable
├── types/
│   └── content.ts      # Tipos TypeScript
└── content-to-use.json # Contenido base original
```

## Contenido Base

El archivo `content-to-use.json` contiene el contenido original que se utilizó como base para crear la estructura de la landing page. Este archivo se mantiene intacto como referencia.

## Personalización

Para personalizar el contenido, edita el archivo `data/content.json` o utiliza el panel de administración en `/admin`.

## Despliegue

El proyecto está configurado para desplegarse fácilmente en Vercel, Netlify o cualquier plataforma que soporte Next.js.
