import Router from "next/router"
import Link from 'next/link'

export default ()=> {
  function gotoTestB(){
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    })
  }
  return (
    <>
      <span>Index</span>
      <b>Index A</b>
    </>
  )
}