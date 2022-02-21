import dynamic from "next/dynamic"
const Spinner = dynamic(()=>import('../components/Spinner') , {ssr : false});

export default function Admin() {
  return(
    <div>
      <Spinner/>
    </div>
  )
}
