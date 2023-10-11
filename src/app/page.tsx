import { getAuthSession } from "@/lib/nextauth";
import IntroCard from "@/components/IntroCard";
import { redirect } from "next/navigation";



export default async function Home() {
  const session  = await getAuthSession()

  if(session?.user){
    redirect("/dashboard")
  }
  
  return (
    <IntroCard />
  )
}
