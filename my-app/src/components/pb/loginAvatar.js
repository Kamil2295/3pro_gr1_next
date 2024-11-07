import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

import PocketBase from 'pocketbase';
import { useEffect, useState } from "react";







export function Avatar_pocketbase({onLogin}) {

    const pb = new PocketBase('http://192.168.15.26:8080');

    const [user, setUser] = useState(null)

    useEffect(()=>{
            setUser(pb.authStore.model)
    },[])

    
    const login = async () => {
 
        try{
            const authData = await pb.collection('users').authWithPassword(
                'test',
                'testtest123',
            );
            console.log(authData)

            console.log(pb.authStore);

            setUser(pb.authStore.model)
            onLogin(pb.authStore.model)
            
        }catch(err){

        }

    }

    const logout = async () => {
        pb.authStore.clear()

        console.log(pb.authStore);
        setUser(null)
        onLogin(null)
    }
 

    return (
        <div className="m-5">



            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <div className="w-[100px]">
                    <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage src={pb.files.getUrl(user, user?.avatar)} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    {
                        user ? <p>zalogowany</p> : <p>niezalogowany</p>
                    }

                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href='/pb/login'>
                    <DropdownMenuItem >Login</DropdownMenuItem>
                    </Link>
                    
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}