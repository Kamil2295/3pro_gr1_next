"use client"
import Borders from '@/components/borders'
import Image from 'next/image'
import {useState, useEffect} from 'react'
export default function KrajInfo({params}){

    const [kraj, setKraj] = useState({})
    const [pobieranie, setPobieranie] = useState(true)
    const [blad, setBlad] = useState(false)

    useEffect(()=>{
        const getData = async ()=>{

            try {
               const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.kod}`)
               const json = await response.json()
               console.log(response)
               console.log(json) 
               setKraj(json[0])

               if(response.status == 400){
                setBlad(true)
               }

            } catch (error) {
                setBlad(true)
                console.log(error)
            } finally {
                setPobieranie(false)
            }
        }
        getData()
    },[])

    return(
        <div>

        {pobieranie && <h1>Pobieranie danych</h1>}
        {blad && <h1>Nie udało się pobrać danych</h1>}
        {kraj?.cca2 != null && 
        <div className='w-full h-screen flex flex-col justify-center items-center'>
        <div className="flex flex-col justify-center items-center p-2 border h-[400px] w-[600px]">
        <Image src={kraj.flags.png} height={198} width={496} className='w-[496px] h-[198px]'></Image>
        <h1 className="text-2xl">{kraj.name.common} {"("+kraj.cca2+")"}</h1>
        <p className="text-sm text-left">{kraj.capital}</p>
        <p className="text-sm text-left">{kraj.population}</p>
        </div>
        <Borders borders={kraj.borders}></Borders>
        </div>
        }
        </div>
    )

}