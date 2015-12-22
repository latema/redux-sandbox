import { combineReducers } from 'redux';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import React from 'react';

const todo = (state, action, newQuantity, oldId) => {
    switch (action.type) {
        case 'ADD_TO_CATEGORY':
            return {
                id: oldId || action.id,
                //id: action.id,
                text: action.text,
                quantity: newQuantity || 1
            };
        case 'DEL_FROM_CATEGORY':
            return {
                id: action.id,
                text: action.text,
                quantity: action.quantity-1
            };
        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CATEGORY':

            var todoIndex = -1;
            for (var i = 0; i < state.length; i++) {
                if (state[i].text === action.text) {
                    todoIndex = i;
                    break;
                }
            }

            if (todoIndex > -1) {
                var foundTodo = state[i];
                return [
                    ...state.slice(0, i),
                    todo(undefined, {
                        text: action.text,
                        type: 'ADD_TO_CATEGORY',
                        id: foundTodo.id
                    }, foundTodo.quantity+1, foundTodo.id),
                    ...state.slice(i+1)
                ];
            } else {
                return [
                    ...state,
                    todo(undefined, action)
                ];
            }
        case 'DEL_FROM_CATEGORY':
            deepFreeze(state);

            var todoRemIndex = -1;
            for (var i = 0; i < state.length; i++) {
                if (state[i].id === action.id) {
                    todoRemIndex = i;
                    break;
                }
            }

            return [...state.slice(0, todoRemIndex),
                todo(undefined, action),
                ...state.slice(todoRemIndex+1)
            ];
        default:
            return state;
    }
};

const visibilityFilter = (
    state,
    action
) => {
    switch (action.type) {
        case 'FILTER_CATEGORY':
            return {
                "type": action.type,
                "text": action.text
            };
        default:
            return {
                "type": 'SHOW_ALL'
            };
    }
};

const todoApp = combineReducers({
    todos,
    visibilityFilter
});

const store = createStore(todoApp);

// filter equals visibilityFilter...
const getVisibleTodos = (
    todos,
    filter
) => {
    switch (filter.type) {
        case 'SHOW_ALL':
            return todos.filter(t => {
                return t.quantity > 0
            });
        case 'FILTER_CATEGORY':
            return todos.filter(t => {
                return t.text.indexOf(filter.text) !== -1 && t.quantity > 0
            });
    }
};

let nextTodoId = 0;

class TodoApp extends Component {
    render() {
        const {
            todos,
            visibilityFilter
        } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        return (
            <div>
                <input ref={node => {
                    this.input = node;
                }} />
                <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TO_CATEGORY',
                    text: this.input.value,
                    id: nextTodoId++
                });
                this.input.value = '';
              }}>
                    Add Todo
                </button>
                <input ref={node => {
                    this.filterInput = node;
                }} />
                <button onClick={() => {
                store.dispatch({
                    type: this.filterInput.value === '' ? 'SHOW_ALL' : 'FILTER_CATEGORY',
                    text: this.filterInput.value
                });
                this.filterInput.value = '';
              }}>
                    Filter Todos
                </button>

                <ul>
                    {visibleTodos.map(todo =>
                        <li key={todo.id}
                            onClick={() => {
                                store.dispatch({
                                    type: 'TOGGLE_TODO',
                                    id: todo.id
                                });
                            }}
                            style={{
                                textDecoration:
                                    todo.completed ?
                                        'line-through' :
                                        'none'
                            }}>
                            {todo.text} {todo.quantity}
                            <a href='#'
                               onClick={e => {
                            e.preventDefault();
                            store.dispatch({
                                type: 'DEL_FROM_CATEGORY',
                                id: todo.id,
                                text: todo.text,
                                quantity: todo.quantity
                            });
                            }}
                            > poista </a>
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
        //todos={store.getState().todos}
            {...store.getState()}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
