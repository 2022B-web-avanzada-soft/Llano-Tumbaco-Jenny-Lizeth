import Layout from "../../components/Layout";
import {useEffect, useState} from "react";
import {Todo, TodoHttp} from "../../servicios/http/todo.http";

export default function (){
    const [arregloTodos, setArregloTodos] = useState([] as Todo[])
    useEffect(//inicar el componente
        ()=>{
            //conuslta API
            consultarTodos();
        },
        []
    )
    const consultarTodos = async () => {
        const resultados = await TodoHttp();
        setArregloTodos([
            ...arregloTodos,
            ...resultados]);
    }

    return(
        <>
            <Layout title={"To-do's"}>
                <h1>To do's</h1>
                {arregloTodos.map(
                    (todo)=>{
                        return (<li key={todo.id}>
                            {todo.id}-{todo.completed}-
                            <a href={'/i_todos/'+todo.id}>
                                {todo.title}
                            </a>
                        </li>)
                    }
                )}
            </Layout>
        </>
    )
}
