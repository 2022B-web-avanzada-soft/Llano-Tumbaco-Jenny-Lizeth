class Persona{
    public nombre: string;
    public apellido: string;
    static nombreReferencial: string = 'Humano';
    protected nombreYApellido = ''; //ducktyping
    constructor(nombreParametro:string, apellidoParametro:string,) {
        this.nombre = nombreParametro;
        this.apellido=apellidoParametro;
        this.nombreYApellido=nombreParametro+''+apellidoParametro;
    }

    private mostrarNombreApellido():string{
        return this.nombreYApellido;
    }
}

class Usuario extends Persona{
    constructor(nombreParametro:string,
                apellidoParametro: string,
                public cedula: string,
                public estadoCivil: string,
    ) {
        super(nombreParametro, apellidoParametro);
        this.cedula;
        this.estadoCivil;

    }
}

const jenny = new Usuario(
    'Jenny',
    'Llano',
    '1755265855',
    'soltera'
);
jenny.nombre;