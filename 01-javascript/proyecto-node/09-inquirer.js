//npm init -> package.json -> dependencias ->scripts
//npm install inquirer -° npm i inquirer
//node_modules -° están las dependencias

const inquirer = require('inquirer'); //llamar a inquirer
async function main(){
    try{
        const respuesta = await inquirer
            .prompt([ //devuelve un arreglo
                { //características para agregar un atributo desde consola
                    type: 'input',
                    name:'apellido',
                    message:'Ingresa Tu nombre'
                },
                {name:'edaad'}
            ]);
        console.log('Respuesta', respuesta);
    }catch(e){
        console.error(e);
    }
}
main();

