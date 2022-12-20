//stringify y Parse

const arregloUsuarios = [
    {
        id:1,
        nombre:'Adrian',
    }
];
const arregloGuardado = JSON.stringify(arregloUsuarios);//tranforma un objeto a un string
const usuario = {
    id: 1,
    nombre: 'Jenny',
};
const objetoGuardado = JSON.stringify(usuario)
console.log('arregloGuardado', arregloGuardado);
console.log('objetoGuardado', objetoGuardado);
const arregloRestaurado = JSON.parse(arregloGuardado) //transforma a objeto
const objetoRestaurado = JSON.parse(objetoGuardado)
console.log('arregloRestaurado', arregloRestaurado);
console.log('objetoRestaurado', objetoRestaurado);