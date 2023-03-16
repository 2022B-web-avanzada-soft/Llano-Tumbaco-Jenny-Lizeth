import Link from 'next/link'
export default function (){
    return(
        <>
            <button type="button"
                    className="btn btn-warning">
                <Link href="/Doctores">Ingresar</Link>
            </button>
        </>
    )
}