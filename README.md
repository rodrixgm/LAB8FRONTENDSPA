Descripción

En este laboratorio se implementó una funcionalidad de comparación de propiedades dentro de una aplicación de bienes raíces desarrollada con React.

Esta funcionalidad permite a los usuarios seleccionar hasta tres propiedades y compararlas lado a lado utilizando métricas clave como precio, habitaciones, baños, área y precio por metro cuadrado.

El objetivo del laboratorio fue practicar manejo de estado, comunicación entre componentes y routing en React.

Funcionalidades Implementadas
Selección de Propiedades

Desde la página principal (HomePage) los usuarios pueden seleccionar propiedades utilizando un botón Comparar dentro de cada tarjeta de propiedad.

Características:

Se pueden seleccionar máximo 3 propiedades

Es posible agregar o quitar propiedades de la comparación

El sistema evita seleccionar más de tres propiedades al mismo tiempo

Página de Comparación

Se creó una página dedicada llamada ComparePage donde se muestran las propiedades seleccionadas en una tabla comparativa.

Las métricas mostradas incluyen:

Precio

Número de habitaciones

Número de baños

Área de la propiedad

Precio por metro cuadrado

Resaltado de Mejores Valores

La tabla resalta automáticamente los mejores valores en cada categoría:

Precio más bajo

Mayor área

Mejor precio por metro cuadrado

Esto permite al usuario identificar fácilmente la mejor opción.

Eliminar de Comparación

Desde la página de comparación, el usuario puede eliminar propiedades directamente de la tabla, actualizando la comparación en tiempo real.

Estado Vacío

Si no hay propiedades seleccionadas, la página de comparación muestra un mensaje informativo indicando que no hay propiedades disponibles para comparar.

Componentes Creados o Modificados
Nuevos componentes

CompareButton.tsx

ComparePage.tsx

Componentes modificados

PropertyCard.tsx

HomePage.tsx

App.tsx

Tecnologías Utilizadas

React 19

React Router

TypeScript

Tailwind CSS

Shadcn UI

Objetivos de Aprendizaje

Este laboratorio permitió reforzar conceptos como:

Manejo de estado en React

Comunicación entre componentes mediante props

Renderizado condicional

Construcción dinámica de interfaces

Diseño de funcionalidades interactivas para el usuario


## Image Gallery (Part 2)

Se implementó una galería de imágenes para visualizar múltiples imágenes por propiedad.

### Funcionalidades principales

- Visualización de imágenes en una cuadrícula de miniaturas
- Modal de pantalla completa al hacer clic en una imagen
- Navegación entre imágenes:
  - Botones (izquierda / derecha)
  - Teclado (← → y Escape)
- Contador de imágenes (ej: "3 of 10")
- Cierre del modal mediante:
  - Botón (X)
  - Tecla Escape
  - Click en el fondo (backdrop)

### Componentes creados

- `ImageGallery.tsx`: Maneja la visualización de miniaturas y estado del modal
- `ImageModal.tsx`: Maneja la vista en pantalla completa y navegación

### Integración

La galería fue integrada en `PropertyDetailPage.tsx`, reemplazando la visualización anterior de imágenes por una experiencia interactiva más completa.