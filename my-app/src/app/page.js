import Imielist from "@/components/imielist";
import Lista from "@/components/lista";
import Link from "next/link";



export default function Home() {
  const lista = ["Kamil Koseski", "Jan Kwalski", "Jan Nowak"]
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
   <Imielist imie="Kamil Koseski" ok/>
   <Imielist imie="Jan Kwalski"/>
   {
    lista.map((osoba, index)=>(
        <Imielist key={index} imie={osoba}/>
    ))
   }
   <Lista lista={lista}/>

   
   </div>
  );
}
