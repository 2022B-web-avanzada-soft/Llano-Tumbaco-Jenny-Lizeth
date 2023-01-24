import {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import Layout from "../components/Layout";
import {Button, FormControl, InputLabel,MenuItem,Select} from "@mui/material";
import {registerStyles} from "@emotion/utils";
type FormularioEjemplo = {
    nombre:string;
    estadoCivil: string;
}
export default function (){
    const [nombre, setNombre] = useState('Adrian');
    const {handleSubmit, register, formState:{errors, isValid}, control} = useForm<FormularioEjemplo>(
        {
            defaultValues: {
                nombre: 'Vicente',
                estadoCivil: ''
            },
            mode:'all'
        }
    )

    const controladorSubmit = (data:FormularioEjemplo)=>{
        console.log(data)
    }

    return(<>
        <Layout title={'Formulario'}>
            <h1>Formulario con react Hook Form</h1>
            <form onSubmit={handleSubmit(controladorSubmit)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="fom-label">Nombre</label>
                    <input type="text"
                    className="form-control"
                    placeholder="EJ:Adrian"
                    id="nombre"
                        {...register('nombre',{
                            required: true,
                            message: 'nombre requerido'
                        },
                            maxLength: {value:20, message:'Longitud máxima 20'},
                            minLength: {value:5, message:'Longitud mínima 5'},
                            validate:{
                                soloNumeros: (valorActual) =>{
                                    //transformar a número un string
                                    //number("1")
                                    //+"1"
                                    if(Number.isNaN+(valorActual)){
                                        //se puede devolver un false o un error
                                        //retur false // error
                                        return 'Ingrese solo números';
                                    }else{
                                        //se devuelve un true
                                        return true; //está correcto
                                    }
                                }
                            }
                        })}
                    aria-describedby="nombreHelp"/>
                    <div id="nombreHelp" className="form-text">
                        Ingresa tu nombre.
                    </div>
                    {errors.nombre &&
                        <div classname="alert alert-warning"
                            role="alert">
                            Tiene errores {errors.nombre.message}
                    }
                </div>
                <Button type="submit" 
                    disabled={!isValid}
                    variant='outlined'>Submit</Button>
            </form>
        </Layout>
        </>)
}

