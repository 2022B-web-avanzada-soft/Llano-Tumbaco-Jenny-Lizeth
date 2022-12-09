const fs = require('fs');

function promesasEsPar(numero){// f->devuelve una promesa
  const miPrimerPromesa = new Promise(
    (resolve, reject)=>{
      if(numero%2 === 0){resolve(numero); /*return (then)*/}
      else{reject(':(no es par');/*throw (catch)*/}
    }
  );
  return miPrimerPromesa
}

function promesaElevarAlCuadrado(numero){
  return new Promise((res)=>res(Math.pow(numero,2)));
}


promesaEsPar(4)
.then(
  (data)=>{
    console.log('DATA',data);
    return promesaElevarAlCuadrado(data);
  }
)
.then(
  (data)=>{
    console.log('DATA',data);
    return promesaElevarAlCuadrado(data);
  }
)
.then(
  (data)=>{
    console.log('DATA Final',data);
    return promesaElevarAlCuadrado(data);
  }
)
.then(//try
  (data)=>{console.log('DATA',data);}
)
.catch( //catch
  (error)=>{console.error('ERROR', error);}
)
.finally( //finally
  ()=>{console.log('Finally');}
);



