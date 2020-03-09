import React, {useState, useReducer,memo,useMemo,useCallback} from 'react'

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
    const [count, dispatchCount] = useReducer(countReducer,0)
    const [name,setName]= useState('jocky')
    
    const config = useMemo(()=>({
        text: `count is ${count}`,
        color: count > 3 ? 'red' :'blue',
    }),[count])
    
    const handelButtonClick = useCallback(()=>dispatchCount({type:'add'}),[])
    
    return (
        <div>
            <input value={name} onChange={(e)=>setName(e.target.value)}/>
            <Child 
            config = {config}
            onButtonClick={handelButtonClick}/>
        </div>
    ) 
}

const Child=memo(function Child({onButtonClick, config}) {
    console.log('child render')
    return (
        <button onClick={onButtonClick} style={{color: config.color}}>
            {config.text}
        </button>
    )
})
export default myCountFunc