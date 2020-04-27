import Router from "next/router"
import Link from 'next/link'
import {connect} from 'react-redux'
import {add } from '../store/store'
import getConfig from 'next/config'
import {useEffect} from 'react'
import axios from 'axios'
const {publicRuntimeConfig} = getConfig()
const  Index = ({count,user,rename,add})=> {
  useEffect(()=> {
    axios.get('/api/user/info').then(resp => console.log('resp',resp))
  },[])
  
  return (

    <>
      <span>Count: {count.count}</span>
      <b>Username: {user.username}</b>
      <br></br>
      <input value= {user.username} onChange = {(e)=>rename(e.target.value)}></input>
      <button onClick ={()=>add(count.count)} >do add</button>
      <a href={publicRuntimeConfig.OAUTH_URL}>去登陆</a>
    </>
  )
}
  function mapStateToProps(state) {
    const { count,user } = state
    return {
      count: count,
      user: user
    }
  }
  function mapDispatchToProps(dispatch){
    return {
      add: (num) => dispatch({type: 'ADD', num}),
      rename: (name)=> dispatch({type: 'UPDATE_USERNAME',name})
    }
  }

Index.getInitialProps = async ({ reduxStore}) => {
  reduxStore.dispatch(add(3))
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index)