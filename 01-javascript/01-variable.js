//01 javascript
//01-variable.js

//mutables (re asignadas)
var numeroUno = 1;
let numeroDos = 2;
numeroUno = 12;
numeroDos = 8;
numeroUno = false;
numeroDos = true;

//inmutables
const configuracionArchivo = 'PDF';
//configuracionArchivos = 'XML';
//vamos a preferir const >let> nunca var

//T ipos de variables (primitivas)
const numero = 1; // number
const sueldo = 1; //number
const texto = 'Jenny'; //"Adrian string
const apellidos = 'Llano'; //string
const boolean = true; //boolean
const hijos = null; //object
const zapatos = 1; //undefined

console.log(typeof numero);
console.log(typeof sueldo);
console.log(typeof texto);
console.log(typeof apellidos);
console.log(typeof boolean);
console.log(typeof hijos);
console.log(typeof zapatos);

if(""){
    console.log("wtring vacio Es verdaderi")
}else{
    console.log("String vacio es falsy")
}
if("Adrian"){
    console.log("wtring con datos Es verdaderi")
}else{
    console.log("String sin datos es falsy")
}

if(-1){
    console.log("negativo es Truty") //
}else{
    console.log("Negativo es falso")
}
if(0){
    console.log("cero es Truty")
}else{
    console.log("cero es falso")//
}
if(1){
    console.log("positivo es Truty") //
}else{
    console.log("positivo es falso")
}

if(null){
    console.log("null es Truty")
}else{
    console.log("Null es falso")//
}
if(undefined){
    console.log("undefined es Truty")
}else{
    console.log("undefined es falso")//
}

//Orden de importancia
//1) "const"
//2)"let"
//3) x- "var"

//objeto JSON
const jenny = {
    "nombre":"Jenny",//llave:valor
    'apellido':'Llano',
    edad:22,
    hijos:null,
    zapados:undefined,
    casado:false,
    ropa:{
        color:'azul',
        talla:'36',
    },
    mascotas:['Luna','Pequitas','Panda'],
};
console.log(jenny);

//Acceder a las propiedades del objeto
jenny.nombre; //"Jenny"
jenny.apellido; //'Llano'
jenny["nombre"];//"Jenny"
//cambiar valores
jenny.nombre="Lizeth";
jenny["nombre"]="Jenny";
//Crear nuevos atributos o metodos dentro del objeto
jenny.sueldo;//undefined
console.log(jenny.sueldo);
jenny.sueldo=1.2;
console.log(jenny.sueldo);//1.2
jenny["gastos"]=0.8;
console.log(jenny.gastos);//0.8
console.log(jenny);

//Borrar el valor de una propiedad
jenny.nombre=undefined; //solo borra el valor más no la llave
console.log(jenny);
console.log(Object.keys(jenny));
console.log(Object.values(jenny));
//DELETE la llave y el valor dentro del objeto
delete  jenny.nombre; //eliminar la llave nombre
console.log(Object.keys(jenny));
console.log(jenny)

//variables por valor o referencia
//variables por valor en JS son las primitivas: number, string, boolean
let edadJenny = 32;
let edadLizeth = edadJenny; //guardamos una primitiva en otra variable
                            //variables por valor
console.log(edadJenny);//32
console.log(edadLizeth);//32
edadJenny=edadLizeth+1;
console.log(edadJenny);//33
console.log(edadLizeth)//32

//variables por referencia: object({},[])
let notas={
    total:10
};
let notasSegundoBimestre = notas; //igualando la referencia
notasSegundoBimestre.total=notasSegundoBimestre.total+1;
console.log(notas);
console.log(notasSegundoBimestre);
//Como clonar objeto
let notasTercerBimestre = Object.assign({},notas);
//object.assign([],arreglo);
notasTercerBimestre.total=notasTercerBimestre.total+1;
console.log('notas',notas);
console.log('notasSegundoBimestre',notasSegundoBimestre);
console.log('notasTercerBimestre',notasTercerBimestre);



