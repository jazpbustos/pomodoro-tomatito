# Tomatito 3.8

Una aplicación de escritorio para concentrarte, trabajar y hacer pausas, con tres espacios: **Normal**, **Estudio** y **Work**.

## Espacios y tiempos

- Normal conserva el jardín y sus animaciones de crecimiento.
- Estudio tiene un escritorio con lectura, escritura e investigación.
- Work tiene una oficina con tipeo, revisión de documentos y videollamadas.
- Los tres tienen ciclos reales: foco, descanso corto, descanso largo y cantidad de pomodoros configurables de forma independiente. Work comienza con 50 / 5 / 15 minutos y 4 pomodoros por ciclo.
- Cada espacio tiene su colección de objetos, recompensas y animaciones. Las sugerencias aparecen en los descansos.

## Notas por proyecto

Cada modo tiene su propio cuaderno. Los proyectos agrupan notas con título, contenido, negrita, tachado, tareas, colores, fondos y adjuntos. La lista de títulos permite desplazarse y ordenar arrastrando. Se pueden fijar notas al reloj, archivar, restaurar y borrar con Deshacer.

Los cambios se guardan automáticamente y hay un botón Guardar. Cada nota se descarga como `.md` o `.txt`; los archivos adjuntos se descargan por separado.

## Música y mini

Lo-fi en vivo se reproduce dentro de la misma ventana. También hay música y sonidos de ambiente sin conexión.

Al minimizar aparece un mini flotante con Tomatito según el modo. En los descansos cambia a una tacita y muestra frases cortas cada 15 segundos. Su tamaño se mantiene estable, incluso con escalado de pantalla de Windows.

## Bandeja de Windows

Tomatito queda disponible junto al reloj. Un clic abre la ventana y el menú permite mostrar el mini, pausar/reanudar y salir. La X oculta la ventana en la bandeja; **Salir de Tomatito** cierra el programa.

La aplicación empaquetada para Windows activa el inicio en la bandeja al iniciar sesión. Se puede desactivar desde **Iniciar con Windows** en el menú del icono. Abrir otra vez el ejecutable recupera la misma ventana.

## Ejecutar desde el código

Se necesita Node.js con npm. Desde esta carpeta:

```sh
npm ci
npm start
```

Las dependencias de Electron y el empaquetador están fijadas en `package.json`. El inicio automático con Windows solo se registra en la aplicación empaquetada.

Para generar la carpeta ejecutable de Windows:

```sh
npm run package
```

El resultado contiene el `.exe` y sus archivos necesarios. Hay que distribuir la carpeta completa, por ejemplo en un ZIP adjunto a una versión publicada de GitHub. Los binarios generados no forman parte del código fuente.

## Datos locales

En Windows, las notas, adjuntos, ajustes y progreso se guardan en `%APPDATA%\Tomatito-Estudio-Work`, fuera de la carpeta del programa. La aplicación original utiliza una carpeta de datos distinta. Las notas compartidas de versiones intermedias se conservan en Work al migrar a cuadernos independientes.

Un reloj pausado conserva su tiempo al salir. Si estaba corriendo, al volver se descuenta el tiempo transcurrido; si el intervalo venció, se pasa al siguiente al abrir. Ocultar la ventana en la bandeja mantiene la aplicación ejecutándose.

## Créditos y licencia

Código bajo la licencia MIT del repositorio. Fuentes, música y sonidos conservan sus créditos y licencias dentro de `fonts/`, `music/` y `ambience/`.
