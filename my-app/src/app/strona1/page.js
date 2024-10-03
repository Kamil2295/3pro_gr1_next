"use client"
import { useState } from "react"
export default function Strona1() {

    const [items, setItems] = useState(["test1"])
    const [input, steInput] = useState("")

    const handleClick = () => {
        setItems([...items, input])
        console.log(...items)
        steInput("")
    }
    

    return (
        <div className="w-full h-screen justify-center items-center">
          
            <input className="border" value={input} onChange={(e)=> steInput(e.target.value)}></input>
            <button className="border" onClick={handleClick}>+1</button>

            <ul>
                {
                    items.map((item, idx)=> 
                        <li key={idx}>{item}</li>
                    )
                }
            </ul>

        </div>
    )
}