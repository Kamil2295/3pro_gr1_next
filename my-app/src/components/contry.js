import Image from 'next/image'
export default function Country({kraj}){

return(

    <div className="border">
        <Image
        src={kraj.flags.png}
        width={200}
        height={100}
        alt={kraj.name.common}
        className='w-[200px] h-[100px]'
        />
        <h1>{kraj.name.common}</h1>
        <p>{kraj.cca2}</p>
    </div>

)

}