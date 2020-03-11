import {createStore, combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'

const initialState = {
    count : 0
}
const userInitialState= {
    username: 'jockey'
}

const ADD ='ADD'
function countReducer(state = initialState, action){
    console.log(state, action)
    switch (action.type) {
        case ADD:
            return {count: state.count +(action.num||1)}
        default :
            return state
    }
}
const UPDATE_USERNAME = 'UPDATE_USERNAME'
function userReducer(state = userInitialState, action){
    switch(action.type) {
        case UPDATE_USERNAME:
            return {
                ...state,
                username: action.name
            }
        default: 
            return state
    }
}
const allReducers = combineReducers({
    count: countReducer,
    user: userReducer
})
//action creator
function add(num){
    return {
        type: ADD,
        num,
    }
}
//异步action 
function addAsync(num){
    return dispatch => {
        setTimeout(()=> {
            dispatch(add(num))
        },1000)
    }
}
// STATE会自动帮我们区分 {count: initialS}
const store = createStore(allReducers,
    {count: initialState,user:userInitialState},
    applyMiddleware(ReduxThunk))
store.dispatch(add(4))
store.subscribe(()=>{
    console.log('changed', store.getState())
})

store.dispatch(addAsync(5))
store.dispatch({type: UPDATE_USERNAME, name: 'charlie'})
export default store