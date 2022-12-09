const fs = require('fs');
/*
una función que acepte como parámetro una varibale
del path del archivo y otra variabele con el "contenidoArchivo"
utilizar el módulo 'fs' para leer el archivo en ese path y añadir
el "contenidoArchivo" a ese archivo
*/
let nuevoContenido;
function leerArchivo(path){
    const miPrimerPromesa = new Promise(
        (resolve, reject)=>{
            fs.readFile(
                './06-ejemplo.txt',//nombre o path del archivo
                'utf-8',//codificación

                (errorLecturaPrimerArchivo , contenidoPrimerArchivo) =>{//callback
                    if(errorLecturaPrimerArchivo){
                        reject('error leyendo archivo');
                    }else{
                        resolve(contenidoPrimerArchivo);
                    }
                }
            );

        }
    );
    return miPrimerPromesa
}


function escribirArchivo(path, contenidoArchivo){
    const miPrimerPromesa = new Promise(
    nuevoContenido+=contenidoArchivo;
    fs.writeFile(
        './06-nuevo-archivo.txt',
        nuevoContenido,
        (errorEscritura) =>{//callback
            if(errorLecturaPrimerArchivo){
                reject('error leyendo archivo');
            }else{
                resolve(nuevoContenido);
            }
        }
    );
);
}

function ejercicio08(path, contenidoArchivo){
    return leerArchivo(path)
}

ejercicio08('./06-ejemplo.txt','lo logramos!')
    .then(
        (data) => {
            console.log('DATA', data);
        }
    )
    .catch(
        (error)=>{console.error('ERROR', error);}
    )
