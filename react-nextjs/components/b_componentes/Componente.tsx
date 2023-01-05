type PropiedadesComponente = {
    url: string;
    iteraciones: number;
    mostrar:boolean;
};

//interface PropiedadesComponente{
export default function(props: PropiedadesComponente){
    const{url, iteraciones, mostrar}=props;
    //const url = props.url;
    //const iteraciones = props.iteraciones
    //const mostrar = props.mostrar
    return(
        <a target="_blanck" href={url}>IR a GOOGlE</a>
        {mostrar ? <p>Hello</p>: <></>}
    )
}
