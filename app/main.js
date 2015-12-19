import Redux from 'redux';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';

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

let nextTodoId = 0;

class TodoApp extends Component {
    render() {
        console.log("perkrekrk:", this.props.todos);
        return (
            <div>
                <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: 'Test',
                    id: nextTodoId++
                });
              }}>
                    Add Todo
                </button>
                <ul>
                    // todos are not a map... to be fixed
                    {this.props.todos.map(todo =>
                        <li key={todo.id}>
                            {todo.next}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const render = (rootEl) => {
    ReactDOM.render(
        <TodoApp
        todos={store.getState().todos}
        />,
        rootEl
    );
};

store.subscribe(render);
let domEl = document.getElementById('root');
console.log("D", document.getElementsByTagName("text"));
render(domEl);

//store.dispatch({
//    type: 'ADD_TODO',
//    id: 0,
//    text: 'Learn redux'
//});
//
