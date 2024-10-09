"use client"

import Country from "@/components/contry"
import { useState, useEffect } from "react"
import Link from 'next/link'
export default function Strona1() {

    const [data, setData] = useState(null)
    const [error, setError] = useState(false)
    const [ladowanie, setLadowanie] = useState(true)
   
    useEffect(()=>{

        const getData = async () =>
       { 
        try {
           const response = await fetch("https://restcountries.com/v3.1/all")
           const dataJson = await response.json()
           setData(dataJson)
           console.log(dataJson)
        } catch(error){
            console.error("nie udało się pobrać danych")
            setError(true)
        }
        finally{
            setLadowanie(false)
        }
    }

    getData()
    },[])
  
    return (
      <div className="flex flex-wrap gap-2 w-full h-screen justify-center ">
        <h1>{ladowanie && "Pobieranie danych"}</h1>
        <h1>{error && "Nie udało się pobrać danych"}</h1>
        {data && 
        data.map((kraj, idx)=>
            <Link key={idx} href={`/strona1/${kraj.cca2}`}>
            <Country  kraj={kraj}/>
            </Link>
        )
        
        }
      </div>
    );
}