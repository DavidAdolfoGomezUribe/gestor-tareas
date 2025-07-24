# Gestor de Tareas CLI

Una aplicación de consola para gestionar tareas de forma sencilla, interactiva y persistente.

Este proyecto fue desarrollado como parte de un taller de refactorización con el objetivo de mejorar un sistema de gestión de tareas, agregando:

* Modularización del código
* Persistencia con archivos JSON
* Uso de la librería Lodash para manipulación de datos
* Interfaz CLI con Inquirer
* Validaciones y mejoras en la experiencia de usuario

## 🚀 Requisitos

* Node.js (v18 o superior)

## 📦 Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

## ▶️ Uso

Ejecuta el programa con:

```bash
node index.js
```

Aparecerá un menú interactivo donde podrás:

* Agregar una nueva tarea
* Listar todas las tareas
* Editar una tarea existente
* Eliminar una tarea
* Salir del programa

## 📁 Estructura del proyecto

```
├── controllers/
│   └── tareasController.js   # Lógica principal de tareas
├── data/
│   └── tareas.js             # Arreglo en memoria (ya no esencial)
├── biblioteca/
│   └── tareas.json           # Archivo JSON con las tareas persistidas
├── utils/
│   └── menu.js               # Menú interactivo con Inquirer
├── index.js                  # Punto de entrada
├── package.json              # Configuración del proyecto
├── .gitignore
└── README.md
```

## 🛠️ Funcionalidades con Lodash

El proyecto utiliza Lodash para mejorar la manipulación de datos:

* `_.isEmpty` para validar campos vacíos
* `_.uniqBy` para evitar duplicados por descripción
* `_.orderBy` para ordenar tareas por estado e ID
* `_.groupBy` (opcional) para agrupar tareas por estado

---

