"use client"
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

export default function Page() {

    const pb = new PocketBase('http://192.168.15.26:8080');
    const [data, setData] = useState([])
    const [dane, setDane] = useState({nazwa: null, cena: null, opis: null})

    

    const form = (e, nazawa)=>{
        setDane((prevDane)=>{
            return(
            {
                ...prevDane,
                [nazawa]:e.target.value
            }
        )
        })
        console.log(dane)
    }

    const  zapisz = async () =>{
        const record = await pb.collection('gry').create(dane);
        setData((prevData)=>{
            return (
                [record, ...prevData ]
            )
        })
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const records = await pb.collection('gry').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setData(records)
            } catch (error) {

            }
        }

        getData()
    }, [])

    return (
        <div className='w-full h-screen '>

            <div className='w-full h-[70vh] flex flex-row gap-2 justify-center flex-wrap'>
            {
                data.length!=0 && data.map((gra) => {

                    return (
                        <Card key={gra.id} className="w-[300px] h-400px">
                            <CardHeader>
                                <CardTitle>{gra.nazwa}</CardTitle>
                                <CardDescription className="text-justify">{gra.opis}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={pb.files.getUrl(gra, gra.zdjecie)}
                                    alt={gra.zdjecie}
                                    width={500}
                                    height={500}
                                />
                            </CardContent>
                            <CardFooter>
                               
                            </CardFooter>
                        </Card>
                    )
                })
            }
            </div>
            <div className='w-full h-[30vh] flex justify-center mt-5'>
                <Card className="w-[400px] p-5 h-[400px]">
                    <CardTitle>
                        Dodaj Grę
                    </CardTitle>
            <Label htmlFor="nazwa">Nazwa</Label>
            <Input onChange={(e)=>{form(e, "nazwa")}} type="text" id="nazwa" placeholder="Nazwa" />

            <Label htmlFor="cena">Cena</Label>
            <Input onChange={(e)=>{form(e, "cena")}} type="number" id="cena" placeholder="Cena" />

            <Label htmlFor="opis">Opis</Label>
            <Input onChange={(e)=>{form(e, "opis")}} type="text" id="opis" placeholder="Opis" />

            <Label htmlFor="zdjecie">Zdjęcie</Label>
            <Input onChange={(e)=>{form}} type="file" id="zdjecie" placeholder="Zdjęcie" />

            <Button onClick={zapisz} className="w-full mt-5">Dodaj grę</Button>
            </Card>
            </div>


        </div>
    )
}