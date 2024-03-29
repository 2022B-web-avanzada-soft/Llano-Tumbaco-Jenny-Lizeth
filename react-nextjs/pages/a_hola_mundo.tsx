/*const a_componente = function(){
    return (<></>)
}*/
/*
export default a_componente
const b_componente = () =>{
    return <></>
}
*/
import EstilosEjemplo from "../components/a_estilos/EstilosEjemplo";
import Componente from "../components/b_componentes/Componente";
import Layout from "../components/Layout";

export default function a_hola_mundo(){
    return(
        <>
            <Layout title={'hola mundo'}>
        <h1>Hola mundo</h1>
        <EstilosEjemplo></EstilosEjemplo>
            <Componente iteraciones={3}
                        mostrar={true}
                        url={'https://www.google.com/'}
            ></Componente>
            </Layout>
        </>
    )
}
