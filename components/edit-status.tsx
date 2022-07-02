import Link from "next/link"

export const EditStatus: React.FunctionComponent = () => {
  return (
    <>
      <Link href="/api/auth/logout">Logout</Link>
      <form>
        <input type='text' placeholder='Mood'/>
      </form>
    </> 
  )
}