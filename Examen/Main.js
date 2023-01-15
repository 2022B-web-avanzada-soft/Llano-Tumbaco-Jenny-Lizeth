const inquirer = require('inquirer');
const fs = require('fs');

class Medico{

    constructor(nombre, especialidad, trabajaFinesDeSemana, costoCita, horasTrabajoDia, pacientes) {
        this.nombre = nombre
        this.especialidad = especialidad
        this.trabajaFinesDeSemana = trabajaFinesDeSemana
        this.costoCita = costoCita
        this.horasTrabajoDia = horasTrabajoDia
        this.pacientes = pacientes

    }

    async crearMedico(){
        const miMedico = new Medico()
        let promMedico;
        const respuestaM = await inquirer
            .prompt([
                {type:'input',name:'nombre',message:'Ingrese el nombre:'},
                {type:'input',name:'especialidad',message:'Ingrese la especialidad:'},
                {type:'input',name:'trabajaFinesDeSemana',message:'¿Trabaja los fines de semana? Si  v  No:'},
                {type:'input',name:'costoCita',message:'Ingrese el costo de la cita:'},
                {type:'input',name:'horasTrabajoDia',message:'Ingrese las horas que trabaja al día:'}
            ]).then(a=>{
                promMedico = new Promise(
                    res =>(
                        miMedico.nombre = a.nombre,
                        miMedico.especialidad = a.especialidad,
                        miMedico.trabajaFinesDeSemana = (a.trabajaFinesDeSemana === 'Si'? true: false),
                        miMedico.costoCita = parseFloat(a.costoCita),
                        miMedico.horasTrabajoDia = parseInt(a.horasTrabajoDia),
                        miMedico.pacientes = [],
                        res(miMedico)
                    ));
            });
        return promMedico
    }

    async actualizarMedico(listaMedico){
        let promMedico;
        let indiceMedico;
        const respuestaM = await inquirer
            .prompt([
                {type:'input',name:'nombre',message:'Ingrese el nombre del médico:'},
                {type:'rawlist',name:'cEleccion',message:'Elige la opción que vas a cambiar:',
                choices: ['nombre', 'especialidad', 'trabajaFinesDeSemana','costoCita','horasTrabajoDía']},
                {type:'input',name:'nuevoValor',message:'Ingrese el nuevo valor:'},
            ]).then(a=>{
                promMedico = new Promise(
                    res =>(
                        listaMedico
                            .forEach(
                                valorActual => {
                                    if (valorActual.nombre == a.nombre) {
                                        indiceMedico = listaMedico.indexOf(valorActual)
                                        switch (a.cEleccion){
                                            case "nombre":
                                                listaMedico[indiceMedico].nombre = a.nuevoValor
                                                break
                                            case "especialidad":
                                                listaMedico[indiceMedico].especialidad = a.nuevoValor
                                                break
                                            case "trabajaFinesDeSemana":
                                                listaMedico[indiceMedico].trabajaFinesDeSemana = (a.nuevoValor === 'Si'? true: false)
                                                break
                                            case "costoCita":
                                                listaMedico[indiceMedico].costoCita = parseFloat(a.nuevoValor)
                                                break
                                            case "horasTrabajoDía":
                                                listaMedico[indiceMedico].horasTrabajoDia = parseInt(a.nuevoValor)
                                                break
                                        }
                                    }
                                }
                            ),
                        res(listaMedico)
                        ));
                });
        return promMedico
    }

    async borrarMedico(listaMedico){
        let promMedico;
        const respuestaM = await inquirer
            .prompt([
                {type:'input',name:'nombre',message:'Ingrese el nombre del médico:'},
            ]).then(a=>{
                promMedico = new Promise(
                    res =>(
                        res(listaMedico.filter(item => item.nombre !== a.nombre))
                    ));
            });
        return promMedico
    }

}

class Paciente{

    constructor(nombre, sexo,edad, fechaDeCita, estaAfiliado) {
        this.nombre = nombre
        this.sexo = sexo
        this.edad = edad
        this.fechaDeCita = fechaDeCita
        this.estaAfiliado = estaAfiliado
    }

    async indiceMedico(listaMedico){
        var promIndiceMedico
        var indiceMedico;
        await inquirer.prompt([
            {type:'input',name:'opcMedico',message:'Ingrese el nombre del Médico:'},
        ]).then(ansM => {
            promIndiceMedico = new Promise(
                res => (
                listaMedico
                    .forEach(
                        valorActual => {
                            if (valorActual.nombre == ansM.opcMedico) {
                                indiceMedico = listaMedico.indexOf(valorActual)
                            }
                        }
                    ),
                res(indiceMedico)
            ));
        });
        return promIndiceMedico
    }

    async crearPaciente(){
        const miPaciente = new Paciente()
        let promPaciente;
        await inquirer
            .prompt([
                {type:'input',name:'nombre',message:'Ingrese el nombre:'},
                {type:'input',name:'sexo',message:'Ingrese el sexo:'},
                {type:'input',name:'edad',message:'Ingrese su edad:'},
                {type:'input',name:'fechaDeCita',message:'Ingrese la fecha de cita(aa-mm-dd):'},
                {type:'input',name:'estaAfiliado',message:'¿Está afiliado?  Si  v  No:'}
            ]).then(a=>{
                promPaciente = new Promise(
                    res =>(
                        miPaciente.nombre = a.nombre,
                        miPaciente.sexo = a.sexo,
                        miPaciente.edad = parseInt(a.edad),
                        miPaciente.fechaDeCita = new Date(a.fechaDeCita.split('-')[0],a.fechaDeCita.split('-')[1],a.fechaDeCita.split('-')[2]),
                        miPaciente.estaAfiliado = (a.estaAfiliado === 'Si'? true: false),
                        res(miPaciente)
                    ));
            });
        return promPaciente
    }

    async actualizarPaciente(listaMedico, indiceMedico){
        let promMedico;
        let indicePaciente;
        await inquirer
            .prompt([
                {type:'input',name:'nombre',message:'Ingrese el nombre del paciente:'},
                {type:'rawlist',name:'cEleccion',message:'Elige la opción que vas a cambiar:',
                    choices: ['nombre', 'sexo', 'edad','fechaDeCita','estaAfiliado']},
                {type:'input',name:'nuevoValor',message:'Ingrese el nuevo valor:'},
            ]).then(a=>{
                promMedico = new Promise(
                    res => {
                        listaMedico[indiceMedico].pacientes
                            .forEach(
                                paciente => {
                                    if (paciente.nombre == a.nombre) {
                                        indicePaciente = listaMedico[indiceMedico].pacientes.indexOf(paciente)
                                        switch (a.cEleccion) {
                                            case "nombre":
                                                listaMedico[indiceMedico].pacientes[indicePaciente].nombre = a.nuevoValor
                                                break
                                            case "sexo":
                                                listaMedico[indiceMedico].pacientes[indicePaciente].sexo = a.nuevoValor
                                                break
                                            case "edad":
                                                listaMedico[indiceMedico].pacientes[indicePaciente].edad = parseInt(a.nuevoValor)
                                                break
                                            case "fechaDeCita":
                                                listaMedico[indiceMedico].pacientes[indicePaciente].fechaDeCita = new Date(a.nuevoValor.split('-')[0], a.nuevoValor.split('-')[1], a.nuevoValor.split('-')[2])
                                                break
                                            case "estaAfiliado":
                                                listaMedico[indiceMedico].pacientes[indicePaciente].estaAfiliado = (a.nuevoValor === 'Si' ? true : false)
                                                break
                                        }
                                    }
                                }
                            )
                        res(listaMedico);
                    });
            });
        return promMedico
    }

    async borrarPaciente(listaMedico, indicMedico){
        let promMedico;
        let listPacientes = listaMedico[indicMedico].pacientes;
        await inquirer
            .prompt([
                {type:'input',name:'nombre',message:'Ingrese el nombre del Paciente:'},
            ]).then(a=>{
                promMedico = new Promise(
                    res =>(
                        listaMedico[indicMedico].pacientes=listPacientes.filter(item => item.nombre !== a.nombre),
                        res(listaMedico)
                    ));
            });
        return promMedico
    }

}



async function main(){

    try{
        const m = new Medico()
            const respuesta = await inquirer
                .prompt([
                    {
                        type: 'rawlist',
                        name: 'opcion',
                        message: '*********************Menú*********************")\n' +
                            '---------Médico------------")\n' + 'Elige una opción:',
                        choices: ['Crear', 'Mostrar Médico con pacientes', 'Actualizar', 'Gestión de Pacientes', 'Borrar Médico con Pacientes', 'Salir']
                    }
                ]).then((answer) => {
                        switch (answer.opcion) {
                            case 'Crear':
                                m.crearMedico().then(
                                    (dataMedico) => {
                                        leerEscribirArchivo('./registro.txt', dataMedico)
                                        main()
                                    })
                                break

                            case 'Mostrar Médico con pacientes':
                                leerArchivo('./registro.txt').then(
                                    dataMedico => {
                                        console.log(JSON.parse(dataMedico))
                                        main()
                                    }
                                )
                                break

                            case 'Actualizar':
                                leerArchivo('./registro.txt').then(
                                    dataMedico =>{
                                        const listMedico = JSON.parse(dataMedico)
                                        m.actualizarMedico(listMedico).then(
                                            newData =>{
                                                escribirArchivo('./registro.txt',JSON.stringify(newData))
                                                console.log('Información actualizada con éxito')
                                                main()
                                            }
                                        )
                                    }
                                )
                                break

                            case 'Gestión de Pacientes':
                                var p = new Paciente()
                                var indiceMedico;
                                leerArchivo('./registro.txt').then(
                                    dataMedico =>{
                                        const listMedico = JSON.parse(dataMedico)
                                        p.indiceMedico(listMedico).then(
                                            indice =>{
                                                indiceMedico = parseInt(indice)
                                                mainPaciente();
                                            }
                                        )
                                    }
                                )
                                async function mainPaciente() {
                                    try {
                                        p = new Paciente()
                                        var medicos = leerArchivo('./registro.txt').then(
                                            dataMedico =>{
                                                medicos = JSON.parse(dataMedico)
                                            }
                                        )
                                        const answPac = await inquirer
                                        .prompt([
                                            {
                                                type: 'rawlist',
                                                name: 'opcion',
                                                message: '*********************Menú*********************")\n' +
                                                         '---------Paciente------------")\n' + 'Elige una opción:',
                                                choices: ['Crear', 'Mostrar Pacientes', 'Actualizar', 'Borrar Paciente', 'Salir']
                                            }
                                        ]).then((ansP) => {
                                            switch (ansP.opcion) {
                                                case 'Crear':
                                                    p.crearPaciente().then(
                                                        (dataPaciente) => {
                                                            medicos[indiceMedico].pacientes.push(dataPaciente)
                                                            escribirArchivo('./registro.txt', JSON.stringify(medicos))
                                                            mainPaciente()
                                                        })
                                                    break

                                                case 'Mostrar Pacientes':
                                                    console.log(medicos[indiceMedico].pacientes)
                                                    mainPaciente()
                                                    break

                                                case 'Actualizar':
                                                    p.actualizarPaciente(medicos, indiceMedico).then(
                                                        newData => {
                                                            escribirArchivo('./registro.txt', JSON.stringify(newData))
                                                            console.log('Información actualizada con éxito')
                                                            mainPaciente()
                                                        }
                                                    )
                                                    break

                                                case 'Borrar Paciente':
                                                    p.borrarPaciente(medicos, indiceMedico).then(
                                                        newData => {
                                                            escribirArchivo('./registro.txt', JSON.stringify(newData))
                                                            console.log('Información borrada con éxito')
                                                            mainPaciente()
                                                        }
                                                    )
                                                    break

                                                case 'Salir':
                                                    main()
                                                    break
                                            }
                                        });
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }
                                break

                            case 'Borrar Médico con Pacientes':
                                leerArchivo('./registro.txt').then(
                                    dataMedico =>{
                                        const listMedico = JSON.parse(dataMedico)
                                        m.borrarMedico(listMedico).then(
                                            newData =>{
                                                escribirArchivo('./registro.txt',JSON.stringify(newData))
                                                console.log('Información borrada con éxito')
                                                main()
                                            }
                                        )
                                    }
                                )
                                break

                            case 'Salir':
                                console.log('Gracias por usar el programa')
                                break

                        }
                    }
                );
    }catch(e){
        console.error(e);
    }
}
main();

async function leerArchivo(path){
    let miPrimerPromesa = await new Promise(
        (resolve, reject)=>{
            fs.readFile(
                path,
                'utf-8',//codificación
                (errorLecturaPrimerArchivo , contenidoArchivo) =>{//callback
                    if(errorLecturaPrimerArchivo){
                        reject('error leyendo archivo');
                    }else{
                        resolve(contenidoArchivo);
                    }
                }
            );
        }
    );
    return miPrimerPromesa
}

async function escribirArchivo(path, contenidoArchivo){
    const miPromesa = await new Promise(
        (resolve, reject)=> {
            fs.writeFile(
                path,
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
async function leerEscribirArchivo(path, nuevoContenido){
    try {
        let respuestaContenidoArchivoOriginal = await leerArchivo(path); //espera una respuesta
        if(respuestaContenidoArchivoOriginal == ""){
           respuestaContenidoArchivoOriginal='[]'
        }
        respuestaContenidoArchivoOriginal = JSON.parse(respuestaContenidoArchivoOriginal);
        respuestaContenidoArchivoOriginal.push(nuevoContenido)
        const strMedico = JSON.stringify(respuestaContenidoArchivoOriginal);
        await escribirArchivo(path, strMedico);
    }catch (error){
        console.error(error);
    }
}



