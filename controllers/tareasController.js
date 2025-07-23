import inquirer from 'inquirer';
import { tareas } from '../data/tareas.js';

import fs from 'fs/promises';

const PATH = "./biblioteca/tareas.json"


//agreagar tareas 

//funcion asincrona para guardar tareas  en JSON

async function guardarTareaEnJSON(tarea, ruta) {
  try {
    let tareasExistentes = [];

    try {
      const data = await fs.readFile(ruta, 'utf-8');
      tareasExistentes = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    tareasExistentes.push(tarea);

    await fs.writeFile(ruta, JSON.stringify(tareasExistentes, null, 4));
    console.log("📝 Tarea guardada en archivo JSON.");
  
  } catch (error) {
    console.error("❌ Error al guardar la tarea:", error.message);
  }
}

// Función principal para agregar tarea
export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción de la tarea:',
    },
  ]);

  const nuevaTarea = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false,
  };

  tareas.push(nuevaTarea);
  console.log('✅ Tarea agregada a memoria.');

  await guardarTareaEnJSON(nuevaTarea, PATH);
}
//listar tareas ,deberia leer json

export async function listarTareas() {

  const PATH = "./biblioteca/tareas.json"
  const respuesta = await fs.readFile(PATH);
  const data = JSON.parse(respuesta)
  if (data.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  }

  console.log('\n📋 Lista de tareas:');
  data.forEach((data, i) => {
    const estado = data.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${data.descripcion}`);
  });
}



export async function editarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  tareas[indice].descripcion = nuevaDescripcion.trim();
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  tareas.splice(indice, 1);
  console.log('🗑️ Tarea eliminada.');
}
