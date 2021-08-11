import { createStore } from "redux";

const initialState = {
    value: "",
    tasks: [
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_VALUE":
            return {
                ...state,
                value: action.payload
            };

        case "ADD_TASK":
            if (state.value != "") {
                return {
                    ...state,
                    value: "",
                    tasks: [...state.tasks, { title: action.payload, completed: false }]
                };
            } else {
                return {
                    ...state
                };
            }


        case "DELETE_TASK":
            let tasks = [...state.tasks];
            tasks.splice(action.payload, 1)
            return {
                ...state,
                tasks: tasks
            };

        case "ADD_COMPLETED":
            let newTasks = [...state.tasks];
            newTasks[action.payload].completed = !newTasks[action.payload].completed
            return {
                ...state,
                tasks: newTasks
            };

        case "UP_TASK":
            let newTasksTwo = [...state.tasks];
            if (action.payload > 0) {
                [newTasksTwo[action.payload - 1], newTasksTwo[action.payload]] = [newTasksTwo[action.payload], newTasksTwo[action.payload - 1]]
            }
            return {
                ...state,
                tasks: newTasksTwo
            };

        case "DOWN_TASK":
            let newTasksThree = [...state.tasks];
            if (action.payload < newTasksThree.length - 1) {
                [newTasksThree[action.payload], newTasksThree[action.payload + 1]] = [newTasksThree[action.payload + 1], newTasksThree[action.payload]]
            }
            return {
                ...state,
                tasks: newTasksThree
            };

        case "EDIT_TASK":
            return {
                ...state,
                value: state.tasks[action.payload].title,
            };

        case "SAVE_EDIT_TASK":
            let newTasksFour = [...state.tasks];
            if (state.value != "") {
                newTasksFour[action.payload].title = state.value
            }
            return {
                ...state,
                tasks: newTasksFour,
                value: ""
            };

        case "CLOSE_EDIT":
            return {
                ...state,
                value: action.payload
            };

        default: return state;
    }
}

const store = createStore(reducer);

export default store;