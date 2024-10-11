"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



export default function Page4() {

    const [licznik, setLicznik] = useState(0)

    const plus = () => {
        setLicznik(licznik + 1)
    }

    const minus = () => {
        setLicznik(licznik - 1)
    }

    const zero = () => {
        setLicznik(0)
    }

    return (

        <div className="flex justify-center items-center h-screen gap-5 flex-col">
            <HoverCard>
                <HoverCardTrigger>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {licznik}
                    </h1>
                </HoverCardTrigger>
                <HoverCardContent>
                    Licznik to: {licznik}
                </HoverCardContent>
            </HoverCard>


            <div className="flex gap-5">
                <Button onClick={minus}>-1</Button>
                <Button onClick={plus}>+1</Button>
            </div>

           
            <Dialog>
                <DialogTrigger asChild> <Button >Settings</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        
                        <DialogDescription>
                        <Button onClick={zero}>Zeruj</Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}