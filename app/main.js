import Redux from 'redux';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import { Component } from 'react';
//import { applyMiddleware } from 'redux';

console.log("ekkek");

const todos = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ];
        default:
            return state;
    }
};

const visibilityFilter = (
    state = 'SHOW_ALL',
    action
) => {
    switch (action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;
        default:
            return state;
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

const render = () => {
    ReactDOM.render(
        <TodoApp />,
        document.getElementById('root')
    );
};

//store.dispatch({
//    type: 'ADD_TODO',
//    id: 0,
//    text: 'Learn redux'
//});
//
