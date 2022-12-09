const fs = require('fs'); //file system
                        //importar modulo fs
//06-ejemplo.txt ->hola
console.log('PRIMERO');
fs.readFile(
    './06-ejemplo.txt',//nombre o path del archivo
    'utf-8',//codificación

    (errorLecturaPrimerArchivo , contenidoPrimerArchivo) =>{//callback
        if(errorLecturaPrimerArchivo){
            console.log('error leyendo archivo', errorLecturaPrimerArchivo);
        }else{
            console.log('Contenido:', contenidoPrimerArchivo);
        }
    }
);

console.log('TERCERO');

//escribir en un archivo
//1) leer archivo:06-ejemplo.txt,
//luego imprimir en consola
let nuevoContenido;
fs.readFile(
    './06-ejemplo.txt',
    'utf-8',
    (errorLecturaPrimerArchivo , contenidoPrimerArchivo) =>{//callback
        if(errorLecturaPrimerArchivo){
            console.log('error leyendo archivo', errorLecturaPrimerArchivo);
        }else{
            console.log('Contenido:', contenidoPrimerArchivo);
            nuevoContenido=contenidoPrimerArchivo
            fs.readFile(
                './01-variable.js',
                'utf-8',
                (errorLecturaPrimerArchivo , contenidoPrimerArchivo) =>{//callback
                    if(errorLecturaPrimerArchivo){
                        console.log('error leyendo archivo', errorLecturaPrimerArchivo);
                    }else{
                        console.log('Contenido:', contenidoPrimerArchivo);
                        nuevoContenido+=contenidoPrimerArchivo;
                        fs.writeFile(
                            './06-nuevo-archivo.txt',
                            nuevoContenido,
                            (errorEscritura) =>{//callback

                            }
                        );
                    }
                }
            );

        }
    }
);
//2)después del paso 1, leer archivo: 01-variables.js
//, luego imprimir en consola
/*fs.readFile(
    './01-variable.js',
    'utf-8',
    (errorLecturaPrimerArchivo , contenidoPrimerArchivo) =>{//callback
        if(errorLecturaPrimerArchivo){
            console.log('error leyendo archivo', errorLecturaPrimerArchivo);
        }else{
            console.log('Contenido:', contenidoPrimerArchivo);
        }
    }
);*/
//3)crear un nuevo archivo llamado 06-nnuevo-archivo.txt
//con el contenido de los otros dos archivos.
/*
fs.writeFile(
    './06-nuevo-archivo.txt',
    nuevoContenido,
    (errorEscritura) =>{//callback
        nuevoContenido.write('./01-variable.js');
        if(errorEscritura){
            console.log('error escribiendo archivo', errorEscritura);
        }else{
            console.log('Escrito');
        }
    }
);
*/


