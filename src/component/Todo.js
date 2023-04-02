import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { UserContext } from '../App'
import instance from '../axios/axios'
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import './todo.css'

function Todo() {
    const [todoText , setTodoText] = useState("")
    const cookies = new Cookies()
    const navigator = useNavigate()
    const [token , setToken] = useState("")
    const [todoList , setTodoList] = useState([])
    const [completeTodoList , setCompleteTodoList] = useState([])
    const data   = useContext(UserContext)
    const [isOpen, setIsOpen] = React.useState(false);
    const [updateText , setUpdateText] = useState("")
    const [updateId , setUpdateId] = useState("")
    const [updateStatus , setUpdateStatus] = useState("");

    const showModal = (todo , id , status) => {
        setUpdateText(todo)
        setUpdateStatus(status)
        console.log(status , "status")
        if (status == "Pending") {
            const data = document.getElementsByClassName("form-check-input");
            console.log(data)
        }else if (status == "Completed") {
            const data = document.getElementsByClassName("form-check-input");
            console.log(data)
        }
        setUpdateId(id)
        setIsOpen(true);
        
    };
    
    const hideModal = () => {
        setUpdateText("")
        setUpdateStatus("")
        setUpdateId("")
        setIsOpen(false);
    };

    async function addTodo() {
        
        const data1 = {
            todos : todoText,
            status : "Pending"
        }

        const addTodoRequest = await instance({
            url : '/add/todo',
            method : "POST",
            data : data1,
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : data.data.token
            }
        })

        if (addTodoRequest.status == 200) {
            setTodoText("")
            getTodo()
        }
    }

    async function getTodo() {
        console.log("get todo function" , token)
        const getTodoList = await instance({
            url : "/get/todo",
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : data.data.token
            }
        })
        
        if (getTodoList.status) {
            let pendingTodo = []
            let completeTodo = []

            getTodoList.data.data.forEach((ele) => {
                if (ele.status == "Pending") {
                    pendingTodo.push(ele)
                }else if(ele.status == "Completed"){
                    completeTodo.push(ele)
                }
            })
            setTodoList(pendingTodo)
            setCompleteTodoList(completeTodo)
        }
    }

    async function deleteTodo(id) {
        
        const deleteTodoData = await instance({
            url : `/delete/todo/${id}`,
            method : "DELETE",
            headers : {
                'Content-Type' : 'application/json'
            }
        })

        if (deleteTodoData.status == 200) {
            getTodo()
        }
    }

    async function updateTodo(todo , id , status) {
        
        console.log(todo , id , "update")
        const updateTodoData = await instance({
            url : `/update/todo/${id}`,
            method : "PUT",
            data : {
                todos : todo,
                status : updateStatus
            },
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : data.data.token
            }
        })

        console.log(updateTodoData)
        if (updateTodoData.status == 200) {
            getTodo()
            hideModal()
        }else{
            alert("there is something wrong ")
        }
    }

    useEffect(() => {
        console.log("another data1" , data)
        if (!data || data == undefined || data.status == "signOut") {
            navigator("/signIn")
        }
    } , [data])

     useEffect( () => {
        console.log(data , "data")
        if (data.status == "signOut") {
            navigator("/signIn")
        }
        getTodo()
    } , [])
    
    return (
    <>
        <div className="todo-container">
            <div className="todo-minicontainer">
                <div className="addtodo">
                    <div className="Todo-input row">
                        <div className="col-sm-8">
                            <input type="text" value={todoText} onChange={(e) => {
                                setTodoText(e.target.value)
                            }}/>
                        </div>
                        <div className="col-sm-4">
                            <input type="btn btn-primary" class="form-submit mt-0 w-100" onClick={addTodo} value='addTodo' />
                        </div>
                    </div>
                </div>
                <Modal show={isOpen} onHide={hideModal}>
                    <Modal.Header>
                        <Modal.Title>Update Todo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" value={updateText} onChange={(e) => {
                            setUpdateText(e.target.value)
                        }} placeholder='Enter Your Text' />
                        <Form className='mt-3'>
                            {['radio'].map((type) => (
                                <div key={`inline-${type} row`} className="mb-3">
                                    <div className="col-md-4 mb-3">
                                        <Form.Check
                                            label="Pending"
                                            name="group1"
                                            type={type}
                                            onClick={
                                                () => {
                                                    setUpdateStatus("Pending")
                                                }
                                            }
                                            checked={updateStatus == "Pending" ? true : false }
                                            id={`inline-${type}-1`}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-3">
                                        <Form.Check
                                            label="Completed"
                                            name="group1"
                                            type={type}
                                            onClick={
                                                () => {
                                                    setUpdateStatus("Completed")
                                                }
                                            }
                                            checked={updateStatus == "Completed" ? true : false }
                                            id={`inline-${type}-2`}
                                        />
                                    </div>
                                </div>
                            ))}
                            </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <input type="btn btn-primary" class="form-submit new m-0 ms-1 me-1" onClick={hideModal} value="Cancel" />
                    <input type="btn btn-primary" class="form-submit new m-0 ms-1 me-1 " onClick={() => {
                        updateTodo(updateText , updateId , updateStatus)
                    }} value="Save" />
                    </Modal.Footer>
                </Modal>
                <div className="showtodo">
                    <Table>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Todo</th>
                            <th style={{width : "110px"}}>Start Date</th>
                            <th style={{width : "110px"}}>End Date</th>
                            <th style={{width : "70px"}}>Edit</th>
                            <th style={{width : "90px"}}>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td colSpan={6}> <h3 style={{ textAlign : "center" }}>Pending List</h3></td>
                        </tr>
                        {
                            todoList.map((ele , index) => {
                                return (<> 
                                    <tr>
                                        <td>{index+1}</td>
                                        <td><div><p className='mb-0' >{ele.todo}</p></div></td>
                                        <td>
                                            <div>
                                                <p className='mb-0'>
                                                    <div>{ele.start_date ? ele.start_date.split(",")[1] : ""}</div>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <p className='mb-0'>
                                                    <div>{ele.end_date ? ele.end_date.split(",")[1] : ""}</div>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="btn btn-primary" class="form-submit new mt-0 w-100" onClick={() => { showModal(ele.todo , ele._id , ele.status) } } value="Edit" />
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="btn btn-primary" class="form-submit new mt-0 w-100" onClick={() => {deleteTodo(ele._id) }}  value="delete" />
                                            </div>
                                        </td>
                                    </tr>
                                </>)
                            })
                        }
                        {
                            todoList.length == 0 ? <tr > <td colSpan={6} >
                                <div style={{"background" : "#0c69f1" , "padding" : "20px 0px", "color" : "white" , "borderRadius" : "10px"}}>
                                     <h4 style={{"textAlign" : "center"}}>Create New Task</h4>
                                </div> </td> </tr> : ""
                            
                        }
                        <tr>
                            <td colSpan={7}> <h3 style={{ textAlign : "center" }}>Completed List</h3></td>
                        </tr>
                        {
                            completeTodoList.map((ele , index) => {
                                return (<> 
                                    <tr>
                                        <td>{index+1}</td>
                                        <td><div><p className='mb-0' style={{ textDecoration: ele.status == "Completed" ? "line-through" : ""}}>{ele.todo}</p></div></td>
                                        <td>
                                            <div>
                                                <p className='mb-0'>
                                                    <div>{ele.start_date ? ele.start_date.split(",")[1] : ""}</div>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <p className='mb-0'>
                                                    <div>{ele.end_date ? ele.end_date.split(",")[1] : ""}</div>
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="btn btn-primary" class="form-submit new mt-0 w-100" onClick={() => { showModal(ele.todo , ele._id , ele.status) } } value="Edit" />
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <input type="btn btn-primary" class="form-submit new mt-0 w-100" onClick={() => {deleteTodo(ele._id) }}  value="delete" />
                                            </div>
                                        </td>
                                    </tr>
                                </>)
                            })
                        }
                        </tbody>
                    </Table> 
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo