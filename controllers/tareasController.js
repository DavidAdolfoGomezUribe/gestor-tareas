import inquirer from 'inquirer';
import { tareas } from '../data/tareas.js';
import fs from 'fs/promises';
import _ from 'lodash';

const PATH = "./biblioteca/tareas.json"

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
    tareasExistentes = _.uniqBy(tareasExistentes, 'descripcion');

    await fs.writeFile(ruta, JSON.stringify(tareasExistentes, null, 4));
    console.log("📝 Tarea guardada en archivo JSON.");
  
  } catch (error) {
    console.error("❌ Error al guardar la tarea:", error.message);
  }
}

export async function agregarTarea() {
  const { descripcion } = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción de la tarea:',
    },
  ]);

  if (_.isEmpty(descripcion.trim())) {
    console.log("⚠️ La descripción no puede estar vacía.");
    return;
  }

  const nuevaTarea = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false,
  };

  tareas.push(nuevaTarea);
  console.log('✅ Tarea agregada a memoria.');

  await guardarTareaEnJSON(nuevaTarea, PATH);
}

export async function listarTareas() {
  const respuesta = await fs.readFile(PATH);
  const data = JSON.parse(respuesta);
  if (data.length === 0) {
    console.log('📭 No hay tareas registradas.');
    return;
  }

  const ordenadas = _.orderBy(data, ['completada', 'id'], ['asc', 'desc']);

  console.log('\n📋 Lista de tareas:');
  ordenadas.forEach((t, i) => {
    const estado = t.completada ? '✅' : '❌';
    console.log(`${i + 1}. [${estado}] ${t.descripcion}`);
  });
}

export async function editarTarea() {
  const respuesta = await fs.readFile(PATH);
  const data = JSON.parse(respuesta);

  if (data.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: data.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  data[indice].descripcion = nuevaDescripcion.trim();
  await fs.writeFile(PATH, JSON.stringify(data, null, 4));
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  const respuesta = await fs.readFile(PATH);
  const data = JSON.parse(respuesta);

  if (data.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: data.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  data.splice(indice, 1);
  await fs.writeFile(PATH, JSON.stringify(data, null, 4));
  console.log('🗑️ Tarea eliminada.');
}
