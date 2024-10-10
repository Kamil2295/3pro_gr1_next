"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Borders({ borders }) {
  const [kraje, setKraje] = useState([]);
  const [pobieranie, setPobieranie] = useState(true);
  const [blad, setBlad] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const krajeData = [];
  
        
        for (const border of borders) {
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
          const data = await response.json();
          krajeData.push(data); 
        }
        setKraje(krajeData);
      } catch (error) {
        console.error("Wystąpił błąd podczas pobierania danych");
        setBlad(true);
      } finally {
        setPobieranie(false);
      }
    };
  
    getData();
  }, [borders]);

 
  

  return (
    <div>
      <h1>Borders</h1>

      <div className="flex flex-wrap gap-4">
        {kraje.length > 0 && 
          kraje.map((krajArray, idx) => {
           
            const kraj = krajArray[0] 

            return (
              <Link key={idx} href={`/strona1/${kraj.cca2}`}>
                <div className="border p-4">
                  <Image
                    src={kraj?.flags?.png}
                    width={200}
                    height={100}
                    alt={kraj?.name?.common}
                    className="w-[200px] h-[100px] object-cover"
                  />
                  <h1>{kraj?.name?.common }</h1>
                  <p>{kraj?.cca2}</p>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>
  );
}
