import {cloneElement } from 'react'
const style = {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20
}
export default ({children,render=<div /> })=> {
    return cloneElement(render, {
        style: Object.assign({},render.props.style, style),
        children,
    })
    
}