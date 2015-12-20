import { combineReducers } from 'redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import React from 'react';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t =>
                todo(t, action)
            );
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
                    // todos are not an array... to be fixed
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

const render = () => {
    ReactDOM.render(
        <TodoApp
        todos={store.getState().todos}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

//store.dispatch({
//    type: 'ADD_TODO',
//    id: 0,
//    text: 'Learn redux'
//});
//
