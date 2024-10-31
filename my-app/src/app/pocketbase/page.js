"use client"
import  DeleteItem  from '@/components/pocketbase/deleteitem';
import EditItem from '@/components/pocketbase/editItem';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Timer } from 'lucide-react';
import Image from 'next/image';
import PocketBase from 'pocketbase';
import { useEffect, useState } from 'react';

const pb = new PocketBase('http://192.168.15.27:8080');


export default function Page(){

    const [samochody, setSamochody] = useState(null)
    const [dane, setDane] = useState({marka: null, model: null, czas_parkowania: null})
    const [zdjecie, setZdjecie] = useState(null)

    useEffect(()=>{

        const getData = async ()=>{
            try{
                const records = await pb.collection('samochody').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setSamochody(records)
            } catch(err){

            } finally {

            }
        }

        getData()
    },[])

    const handleInputChange = (id, e) =>{
     

        

        setDane((prev)=>({
         ...prev,
         [id]: e.target.value
    }))

   

    console.log(dane)
    }

    const handleSubmit = async ()=>{

        const formData = new FormData()

        formData.append("marka", dane.marka)
        formData.append("model", dane.model)
        formData.append("czas_parkowania", dane.czas_parkowania)
        formData.append("zdjecie", zdjecie)

        try{
            const record = await pb.collection('samochody').create(formData);
            setSamochody((prev)=>([
                ...prev,
                record
            ]))
        }catch(err){

        }

    }

    const handleZdjecie = (e)=>{
        // console.log(e)
        setZdjecie(e.target.files[0])
    }

    const deleted = (id)=>{
        setSamochody((prev)=>(
            prev.filter((el) => {
                return el.id != id
            }
             
            )
        ))
    }

    const updated = (item)=>{
            console.log(item)
            var index = null
            var tmpSamochody = [...samochody]
            for(let i in samochody){
                if(samochody[i].id == item.id)
                    index = i
            }

            tmpSamochody[index] = item
            setSamochody(tmpSamochody)
            console.log("index: "+ index)
    }

    return(
        <div>
            <h1>Pocketbase</h1>

            <div className='flex w-full justify-center flex-wrap gap-5'>
            {
               samochody && 
               
               samochody.map((samochod)=>(

                
                    <Card key={samochod.id} className="w-[400px]">
                    <CardTitle>{samochod.marka}</CardTitle>
                    <CardDescription>{samochod.model}</CardDescription>
                    <CardContent className="m-0 p-0">
                        <Image
                        src={pb.files.getUrl(samochod, samochod.zdjecie)}
                        alt={samochod.zdjecie}
                        width={500}
                        height={500}
                        className='rounded-md'
                        />
                    </CardContent>
                    <CardFooter>
                           <div className='w-full flex  justify-between'>
                               <div className='mt-5 flex flex-row gap-2'>
                                   <DeleteItem id={samochod.id} ondeleted={deleted}/>
                                   <EditItem item={samochod} onupdated={updated}/>
                               </div>

                               <div className='flex justify-end  mt-5'>
                                   <Timer />
                                   <p>czas parkowania: </p>
                                   {samochod.czas_parkowania}
                               </div>
                           </div>
                        
                    </CardFooter>
                </Card>

                


               ))
                
            }
            </div>

            <div className='mt-5 flex flex-col w-full items-center flex-wrap gap-5'>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="marka">Marka</Label>
                    <Input onChange={(e)=> {handleInputChange("marka", e)}} type="text" id="marka" placeholder="Marka" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="model">Model</Label>
                    <Input onChange={(e)=> {handleInputChange("model", e)}} type="text" id="model" placeholder="Model" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="czas_parkowania">Czas parkowania</Label>
                    <Input onChange={(e)=> {handleInputChange("czas_parkowania", e)}} type="number" id="czas_parkowania" placeholder="Czas parkowania" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="zdjecie">Zdjęcie</Label>
                    <Input onChange={(e)=>{ handleZdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjęcia" />
                </div>

                <div className="">
                    <Button onClick={handleSubmit} className="w-full">Dodaj</Button>
                </div>
            </div>

           
        </div>
    )
}