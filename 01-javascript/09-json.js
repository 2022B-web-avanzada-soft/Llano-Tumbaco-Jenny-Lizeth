//stringify y Parse

const arregloUsuarios = [
    {
        id:1,
        nombre:'Adrian',
    },{id:2,
        nombre: 'pp',
    }
];
console.log(arregloUsuarios)
const arregloGuardado = JSON.stringify(arregloUsuarios);//tranforma un objeto a un string
let usuario = {
    id: 1,
    nombre: 'Jenny',
};
const usuario2 = {
    id: 3,
    nombre: 'liz',
};
usuario = [usuario]
usuario.push(usuario2)
console.log("mmm "+usuario)
const objetoGuardado = JSON.stringify(usuario)
console.log('arregloGuardado', arregloGuardado);
console.log('objetoGuardado', objetoGuardado);
const arregloRestaurado = JSON.parse(arregloGuardado) //transforma a objeto
const objetoRestaurado = JSON.parse(objetoGuardado)
console.log('arregloRestaurado', arregloRestaurado);
console.log('objetoRestaurado', objetoRestaurado);
console.log(arregloRestaurado[0].nombre == 'Adrian')
const nuevo = arregloRestaurado.filter((item) => item.nombre !== 'Adrian')
console.log(nuevo)