import Link from "next/link";

export default function Menu(){

    return(
        <div className="flex gap-2 items-center w-full">
            <Link href="/">main</Link>
            <Link href="/strona1">strona1</Link>
            <a href="/strona1">Zmieniony</a>
        </div>

    )
}