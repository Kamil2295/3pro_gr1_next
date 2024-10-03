
export default function Imielist({imie, ok}){
    var clasname = ""
    if(ok){
        clasname="border w-[200px] text-center bg-green-500"
    } else {
        clasname="border w-[200px] text-center"
    }
    return (
        <div className={clasname}>
        <p>{imie}</p>
        </div>
    )
}