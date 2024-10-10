"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Borders({ borders }) {
  const [kraje, setKraje] = useState([]);
  const [pobieranie, setPobieranie] = useState(true);
  const [blad, setBlad] = useState(false);
  const [maxp, setMaxp] = useState(0)
  const [classnames, setClassnames] = useState("border p-4 bg-white rounded-2xl flex items-center flex-col")

  useEffect(() => {
    const getData = async () => {
      try {
        const krajeData = [];
        var tmpmaxp = 0
  
        
        for (const border of borders) {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
          const data = await response.json();
          
          if(tmpmaxp < data[0].population){
            tmpmaxp = data[0].population
          }

          krajeData.push(data); 
        }
        setKraje(krajeData);
        setMaxp(tmpmaxp)
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych");
        setBlad(true);
      } finally {
        setPobieranie(false);
      }
    };
  
    getData();
  }, [borders]);

 console.log(maxp)
  

  return (
    <div className='mt-5 border p-5  bg-slate-400 rounded-2xl'>
     
      {pobieranie && <h1>Pobieranie danych</h1>}
      <div className="flex flex-wrap gap-4">
        {kraje.length > 0 && 
          kraje.map((krajArray, idx) => {
           
            const kraj = krajArray[0] 

            return (
              <Link key={idx} href={`/strona1/${kraj.cca2}`}>
                <div className={ 'relative border p-4 bg-white rounded-2xl flex items-center flex-col'} >
                  <Image
                    src={kraj?.flags?.png}
                    width={200}
                    height={100}
                    alt={kraj?.name?.common}
                    className="w-[200px] h-[100px] object-cover rounded-2xl  border shadow-xl "
                  />
                  <h1 className="text-xl">{kraj?.name?.common }</h1>
                  <p>{kraj?.cca2}</p>
                  <p className="absolute bottom-0 right-1 ">{maxp == kraj.population ? "max pop" :''}</p>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}
