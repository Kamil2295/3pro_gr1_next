export default function Lista({lista}){

    return(
        <ul>
            {
                lista.map((item, idx)=>(
                    <li key={idx}>{item}</li>
                ))
            }
        </ul>

    )
}