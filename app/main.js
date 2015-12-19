import Redux from 'redux';
import { combineReducers } from 'redux';
import { createStore } from 'redux';
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

store.dispatch({
    type: 'ADD_TODO',
    id: 0,
    text: 'Learn redux'
});

const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn redux'
    };
    const stateAfter = [
        {
            completed: false,
            id: 0,
            text: 'Learn redux'
        }
    ];
    deepFreeze(stateBefore);
    deepFreeze(action);

    console.log("init state:");
    console.log(store.getState());

    console.log("set filter...")
    store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_COMPLETED'
    });

    console.log("init state 2:");
    console.log(store.getState());

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

testAddTodo();
console.log("all tests passed!");