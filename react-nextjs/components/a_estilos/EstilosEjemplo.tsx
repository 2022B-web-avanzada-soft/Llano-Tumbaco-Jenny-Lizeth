import styles from './estilos.module.css'
import styled from "@emotion/styled";
// Los estilos deben de tener el nombre "module.css"

//Styked components
const Titulo = styled.h1`
    font-size: 2rem;
    text-transform: uppercase;
    color: orange;
`
const TituloRojo = styled.h1`
    font-size: 1.5rem;
    text-transform: capitalize;
  color: red
`
const Subtitulo = styled.h2`
    font-size: 1.5rem;
    text-transfrom:capitalize;
    color:green;
`

export default function () {
    const misEstilos = {
        color: '#FFF',
        backgroundColor: 'black',
        borderBottom: '5px solid yellow',
    };
    return (
        <>
            <Titulo>Hola Titulo</Titulo>
            <TituloRojo>HolaTitulo</TituloRojo>
            <Subtitulo>Hola Titulo</Subtitulo>
            <h1 style={
                {
                    color: misEstilos.color,
                    backgroundColor: misEstilos.backgroundColor,
                    borderBottom: misEstilos.borderBottom,
                }
            }>
                Estilos en objeto
            </h1>
            <div style={misEstilos}>Otros estilos</div>
            <div className={styles.rojo}>
                Estilos en hoja de estilos
            </div>
        </>
    )
}