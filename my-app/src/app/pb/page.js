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
import { Pencil, Trash2 } from 'lucide-react';
import { EditItem } from '@/components/pb/edititem';
import { useToast } from "@/hooks/use-toast"
import { Avatar_pocketbase } from '@/components/pb/loginAvatar';

export default function Page() {
    const { toast } = useToast()
    const pb = new PocketBase('http://192.168.15.26:8080');
    const [data, setData] = useState([])
    const [dane, setDane] = useState({nazwa: null, cena: null, opis: null})
    const [zdjecie, setZdjecie] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(()=>{
        setUser(pb.authStore.model)
},[])

const login = (user_pb) => {
    setUser(user_pb)
}

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

    const handlezdjecie = (e) => {
        console.log(e)
        setZdjecie(e.target.files[0])
    }

    const  zapisz = async () =>{

        const formdata = new FormData() 
        
        formdata.append("nazwa", dane.nazwa)
        formdata.append("cena", dane.cena)
        formdata.append("opis", dane.opis)
        formdata.append("zdjecie", zdjecie)

        const record = await pb.collection('gry').create(formdata);
        setData((prevData)=>{
            return (
                [record, ...prevData ]
            )
        })

        toast({
            title: "nowa gra została dodana do bazy",
            description: new Date().toLocaleString(),
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


    const delItem = async (id) =>{
        console.log(id)

        try{
            await pb.collection('gry').delete(id);


            //atkualizacja stanu po usunięciu
            setData((prev)=>(
                    prev.filter(item => {
                        return item.id != id
                    })
            ))

        }catch(err){

        }
    }

    const updateItem = (item) => {
        console.log(item)

        var tmpData = [...data]
        var index = null

        for(let i in data){
            if(item.id == tmpData[i].id){
                index = i
            }
        }

        tmpData[index] = item

        console.log(tmpData)

        setData(tmpData)

        console.log("index: " + index)
    }

    

    return (
        <div className='w-full h-screen '>

            <Avatar_pocketbase onLogin={login}/>
            <div className='w-full h-[70vh] flex flex-row gap-2 justify-center flex-wrap'>
            {
                user ?
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
                            <div className='w-full flex justify-center'>
                                <h3>Cena: {gra.cena}</h3>
                                </div>
                            </CardContent>
                            <CardFooter >
                                <div className='w-full flex justify-end'>
                                    <EditItem gra={gra} onupdate={updateItem}/>
                                    <Button onClick={()=>{ delItem(gra.id) }} variant="ghost">
                                        <Trash2 />
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    )
                }) 
                :
                <p>niezalogowany</p>
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
            <Input onChange={(e)=>{handlezdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjęcie" />

            <Button onClick={zapisz} className="w-full mt-5">Dodaj grę</Button>
            </Card>
            </div>


        </div>
    )
}