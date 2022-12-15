const fs = require('fs');
/*
una función que acepte como parámetro una varibale
del path del archivo y otra variabele con el "contenidoArchivo"
utilizar el módulo 'fs' para leer el archivo en ese path y añadir
el "contenidoArchivo" a ese archivo
*/
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
    const miPromesa = new Promise(
        (resolve, reject)=> {
            fs.writeFile(
                './06-ejemplo.txt',
                contenidoArchivo,
                (errorEscritura) => {//callback
                    if (errorEscritura) {
                        reject('error leyendo archivo');
                    } else {
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
    return miPromesa
}

function ejercicio08(path, contenidoArchivo){
    return leerArchivo(path)
        .then(
            (data) => {
                return escribirArchivo(path, data + contenidoArchivo);
            }
        )
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

//ASYNC AWAIT
async function asyncAwaitUno(path, nuevoContenido){
    try {
        const respuestaContenidoArchivoOriginal = await leerArchivo(path); //espera una respuesta
        await escribirArchivo(path, respuestaContenidoArchivoOriginal+nuevoContenido);
        //await escribirArchivo(path, await leerArchivo(path)+nuevoContenido);
    }catch (error){
        console.error(error);
    }
}

asyncAwaitUno('06-ejemplo.txt','lo logramos')
const asyncAwaitDos = async function () {}
const asynAwaitTres = async () =>{}


