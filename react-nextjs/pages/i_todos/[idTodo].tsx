import Layout from "../../components/Layout";
import {GetStaticPaths, GetStaticProps} from "next";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";
import {useRouter} from "next/router";

interface ParametrosTodo{
    error?:string;
    todo?: Todo;

}

//http://localhost:3000/i_todos/nombre
export default function (params:ParametrosTodo){
    console.log(params);
    const router = useRouter()
    //parámetros que llegan de la ruta
    const {idTodo,nombre, apellido} = router.query
    console.log(idTodo, nombre, apellido)
    return(
        <>
            <Layout title={"To-do's hijos"}>
                <h1>To do's hijos {params?.todo.title}</h1>
            </Layout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async ()=>{
    //consulta de los ids válidos
    const paths=[
        {
            params:{idTodo:'1'},
        },
        {
            params: {idTodo: '2'},
        },
        {
            params: {idTodo: '4'},
        }
    ];
    return {paths, fallback:false}
}
//código para cargar información en el servidor y enviar al cliente
export const getStaticProps: GetStaticProps=async (
    {params}
)=>{
    try{
        //fetch
        const id = params?.idTodo as string ;
        const resultado = await TodoHttp(id);
        return{props:{todo:resultado}}
    }catch (err:any){
        return{props:{errors: err.message}}
    }
}

