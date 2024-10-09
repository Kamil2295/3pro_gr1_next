"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Info({params}){

    const [kraj, setKraj] = useState([])
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(true)

    useEffect(()=>{
        async function getData() {

            try{
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.kod}`)
                console.log(response)
                const json = await response.json()
                console.log(json)
                setKraj(json)
               
              
            } catch(error) {
                setError(true)
                console.log("ERROR")
            } finally {
                setLoad(false)
            }
            
        }

        getData()
    }, [])

    useEffect(()=>{
        if(kraj[0]== undefined){
            setError(true)
        }
        if(kraj[0]!= undefined){
            setError(false)
        }
    },[kraj])

  


  
    return(
        <div>
        {error && <h1>Nie udało się pobrać danych</h1>}
        {load && <h1>Pobieranie danych</h1>}
        {kraj.length>0 && 
        <div className=" h-screen flex flex-col justify-center items-center">
            <div className="border p-2 flex flex-col justify-center items-center bg-green-400">
            <Image
        src={kraj[0].flags.png}
        width={200}
        height={100}
        alt={kraj[0].name.common}
        className='w-[800px] h-[400px]'
        quality={100}
        />
        <h1 className="text-2xl font-bold">{kraj[0].name.common}</h1>
        <p>{kraj[0].cca2}</p>
        </div>
        <Link href="/strona1">PREW</Link>
            </div>}
        </div>
    )
}