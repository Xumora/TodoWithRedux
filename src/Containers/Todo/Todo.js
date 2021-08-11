import React, { useState } from 'react'
import { faArrowDown, faArrowUp, faBars, faEdit, faPlus, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, ListGroup, ListGroupItem, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';


const Todo = (props) => {
    const value = useSelector(state => state.value);
    const data = useSelector(state => state.tasks);
    const [selected, setSelected] = useState(-1);
    const [isEditOff, setisEditOff] = useState(true)

    const dispatch = useDispatch();

    const typing = (event) => {
        const action = { type: "SET_VALUE", payload: event.target.value }
        dispatch(action);
    }

    const add = () => {
        const action = { type: "ADD_TASK", payload: value }
        dispatch(action);
    }

    const deleteTask = (index) => {
        const action = { type: "DELETE_TASK", payload: index }
        dispatch(action);
    }

    const addCompleted = (index) => {
        const action = { type: "ADD_COMPLETED", payload: index }
        dispatch(action);
    }

    const upTask = (index) => {
        const action = { type: "UP_TASK", payload: index }
        dispatch(action);
    }

    const downTask = (index) => {
        const action = { type: "DOWN_TASK", payload: index }
        dispatch(action);
    }

    const editTask = (index) => {
        setSelected(index)
        setisEditOff(false)
        const action = { type: "EDIT_TASK", payload: index }
        dispatch(action);
    }

    const saveEditTask = () => {
        setisEditOff(true)
        const action = { type: "SAVE_EDIT_TASK", payload: selected }
        dispatch(action);
    }

    const closeEdit = () => {
        setisEditOff(true)
        const action = { type: "CLOSE_EDIT", payload: "" }
        dispatch(action);
    }


    return (
        <div className="bg-white rounded p-3 shadow">
            <h1>Todo App</h1>

            <div className="d-flex mb-2">
                <Input onChange={typing} value={value} placeholder="new task" className="me-2" />
                <Button color="primary" onClick={add} className={`${!isEditOff && "d-none" || ""}`}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                <Button color="success" className={`ms-3 ${isEditOff && "d-none" || ""}`} onClick={saveEditTask}>
                    <FontAwesomeIcon icon={faSave} />
                </Button>
                <Button color="danger" className={`ms-3 ${isEditOff && "d-none" || ""}`} onClick={closeEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </div>
            <ListGroup>
                {data?.map((value, index) => {
                    return (
                        <ListGroupItem key={index} tag="a" href="#" action
                            className="d-flex align-items-center justify-content-between" onDoubleClick={() => addCompleted(index)}>

                            <span style={value.completed && { textDecoration: "line-through" } || {}}>{index + 1}. {value.title}</span>

                            <UncontrolledButtonDropdown>
                                <DropdownToggle caret>
                                    <FontAwesomeIcon icon={faBars} />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Functions</DropdownItem>
                                    <DropdownItem onClick={() => deleteTask(index)}><FontAwesomeIcon icon={faTrash} /> Delete</DropdownItem>
                                    <DropdownItem onClick={() => editTask(index)}><FontAwesomeIcon icon={faEdit} /> Edit</DropdownItem>
                                    <DropdownItem onClick={() => upTask(index)}><FontAwesomeIcon icon={faArrowUp} /> Up</DropdownItem>
                                    <DropdownItem onClick={() => downTask(index)}><FontAwesomeIcon icon={faArrowDown} /> Down</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledButtonDropdown>

                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </div>

    )
}

export default Todo