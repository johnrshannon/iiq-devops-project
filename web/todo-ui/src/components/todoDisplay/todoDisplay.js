import '../../css/App.css';
import ListGroup from 'react-bootstrap/ListGroup';
import TodoItem from './todoItem';
import Container from 'react-bootstrap/Container';
import TodoForm from  './todoForm';
import { useState, useEffect, useCallback } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function TodoDisplay ({setServerUp, serverUp}) {
  const [todoData, setTodoData] = useState([])
  const BASE_URL = window.BASE_URL;

  const pullData = useCallback(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then((resp) => {
        setTodoData(resp)
        setServerUp(true)
      })
      .catch((err) => {
        setServerUp(false)
        setTimeout(pullData, '15000')
      })
  }, [setServerUp])

  useEffect(() => {
      pullData()
  }, [pullData])

  function markComplete(id, complete) {
    const arrId = todoData.findIndex((obj) => obj.id === id)
    const todoName = todoData[arrId].name
    const putBody = JSON.stringify({name: todoName,isComplete: complete})
    fetch(BASE_URL + '/' + id, {
      method: 'Put',
      headers: {
        'accept': '*/*',
        'Content-Type': 'application/json'
      },
      body: putBody
    }).then(() => pullData())
    .catch(err => {
      console.log(err)
      setServerUp(false)
    })
  }

  const ListItems = todoData.map(todo => <TodoItem key={todo.id} item={todo} markComplete={markComplete}/>) 
  function addToList(todo) {
      fetch(BASE_URL, {
        method: 'Post',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: todo, isComplete: false})
      })
      .then(resp => resp.json()).then(() => pullData())
      .catch(err => {
        console.log(err)
        setServerUp(false)
      })
  }
  function showForm(serverUp, addToList) {
    if (serverUp) {
      return <TodoForm addToList={addToList}/>
    } else {
      return <div></div>
    }
  }
  return (
    <Container className={'todoContainer'}>
      <ListGroup>
      <ListGroup.Item variant="secondary">
      <Row>
        <Col>Task</Col>
        <Col>Completed?</Col>
      </Row>
      </ListGroup.Item>
        {ListItems}
      </ListGroup>
      {showForm(serverUp, addToList)}
    </Container>
  )
}
export default TodoDisplay