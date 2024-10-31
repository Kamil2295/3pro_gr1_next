import { Button } from "@/components/ui/button"
import PocketBase from 'pocketbase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Textarea } from "../ui/textarea"
import { Trigger } from "@radix-ui/react-dialog";

import { useToast } from "@/hooks/use-toast"







export function EditItem({gra, onupdate}) {
    const { toast } = useToast()
    const pb = new PocketBase('http://192.168.15.26:8080');
    const [dane, setDane] = useState({nazwa: gra.nazwa, cena: gra.cena, opis: gra.opis})


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

    const  update = async () =>{

        const formdata = new FormData() 
        
        formdata.append("nazwa", dane.nazwa)
        formdata.append("cena", dane.cena)
        formdata.append("opis", dane.opis)
        // formdata.append("zdjecie", zdjecie)

        const record = await pb.collection('gry').update(gra.id, formdata);

        onupdate(record)

        toast({
            title: "dane zostały zaktualizowane",
            description: new Date().toLocaleString(),
          })
        
    }

  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button variant="ghost"><Pencil/></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edytuj grę</DialogTitle>
          <DialogDescription>
            Kliknij w przycisk "Zapisz dane"
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          <Label htmlFor="nazwa">Nazwa</Label>
            <Input defaultValue={gra.nazwa} onChange={(e)=>{form(e, "nazwa")}} type="text" id="nazwa" placeholder="Nazwa" />

            <Label htmlFor="cena">Cena</Label>
            <Input defaultValue={gra.cena} onChange={(e)=>{form(e, "cena")}} type="number" id="cena" placeholder="Cena" />

            <Label htmlFor="opis">Opis</Label>
            <Textarea defaultValue={gra.opis} onChange={(e)=>{form(e, "opis")}} type="text" id="opis" placeholder="Opis" />

            {/* <Label htmlFor="zdjecie">Zdjęcie</Label>
            <Input onChange={(e)=>{handlezdjecie(e)}} type="file" id="zdjecie" placeholder="Zdjęcie" /> */}
          
        </div>
        <DialogFooter>
            <Trigger asChild> 
          <Button onClick={update}>Zapisz dane</Button>
          </Trigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
