import {ADD_MOVIE, REMOVE_MOVIE, GET_MOVIES, GET_NUMBER} from '../actions'

const initialState = {
    movies: [],
    number: 0
}

export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE:
            console.log("add", action.payload)
            return {
                movies: action.payload,
                number: action.payload.length
            }
        case REMOVE_MOVIE:
            console.log("remove", action.payload)
            return {
                movies: action.payload,
                number: state.number - 1
            }
        case GET_MOVIES:
            console.log("get", action.payload)
            return {
                ...state,
                movies: action.payload,
            }
        case GET_NUMBER:
            console.log("number", action.payload)
            return {
                ...state,
                movies: action.payload,
            }
        default: return state;
    }
    return state
}
