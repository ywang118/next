import React, {useState, useReducer, useContext,useLayoutEffect,useEffect} from 'react'
import myContext from '../lib/my-context'
class MyCount extends React.Component {
    state = {
        count : 0,
    }
    componentDidMount(){
        this.interval = setInterval(()=> {
            this.setState({count: this.state.count +1})
        },1000)
    }
    componentWillUnmount(){
        if(this.interval){
            clearInterval(this.interval)
        }
    }
    render(){
        return <span>{this.state.count}</span>
    }
}

function countReducer(state,action){
    switch(action.type){
        case 'add':
            return state +1
        case 'minus':
            return state -1
        default:
            return state
    }
}
function myCountFunc(){
    //const [count, setCount] = useState(0)
    const [count, dispatchCount] = useReducer(countReducer,0)
    const [name,setName]= useState('jocky')
    const context = useContext(myContext)
    // useEffect(()=>{
    //     const interval = setInterval(()=> {
    //         // setCount(c=> c+1)
    //         dispatchCount({type: 'add'})
    //     },1000)
    //     return ()=> clearInterval(interval)
    // },[])
    useEffect(()=> {
        console.log('effect invoked')
        return ()=> console.log('effect deteted')
    },[])
    return (
        <div>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=> dispatchCount({type:'add'})}>{count}</button>
            <p>{context}</p>
        </div>
    )
   
   
}

export default myCountFunc