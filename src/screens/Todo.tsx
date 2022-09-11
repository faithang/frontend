import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

import {
  Container,
  Row,
  Col,
  Button,
} from '@govtechsg/sgds-react';

import CONFIG from '../config';
import Table from '../components/Table';

export type TodoItemProps = {
  id: string,
  description: string,
  done: boolean,
};

function TodoItem(props: TodoItemProps) {
  const [done, setDone] = useState(props.done);
  const updateTodoItem = useCallback(async () => {
    await axios.put(`${CONFIG.API_ENDPOINT}/todos/${props.id}`, {
      id: props.id,
      description: props.description,
      done: done,
    });
  }, [props.description, props.id, done]);

  useEffect(() => {
    /* mark the todo when done (as a dependency) changes */
    console.log(props.description, 'is marked as ', done ? 'done' : 'undone');
    updateTodoItem();
  }, [props.description, done, updateTodoItem]);

  return (<>
    <tr>
      <td>{<input type="checkbox" checked={done} onChange={(event) => setDone(event.currentTarget.checked)}></input>}</td>
      <td width={'100%'}>{props.description}</td>
    </tr>
  </>
  );
}

interface TodoProps {

}

function Todo(props: TodoProps) {
  const [todoItems, setTodoItems] = useState<{ [id: string]: TodoItemProps }>({});
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const today = new Date();
  const dateOptions = {day: 'numeric', month: 'long', year: 'numeric'} as const

  const [isRefresh, setIsRefresh] = useState(false);
  const populateTodos = useCallback(async () => {
    const result = await axios.get(`${CONFIG.API_ENDPOINT}/todos`);
    setTodoItems(result.data);
  }, []);

  const onRefreshClicked = useCallback(async () => {
    setIsRefresh(true);
    setTimeout(async () => {
      await populateTodos();
      setIsRefresh(false);
    }, 400);
  }, [populateTodos]);

  useEffect(() => {
    onRefreshClicked();
  }, [onRefreshClicked]);

 async function submitNewTodo() {
    // Add a check here
    if (newTodoDescription.trim() !== '') {
      const newTodo = {
        description: newTodoDescription,
      };
      await axios.post(`${CONFIG.API_ENDPOINT}/todos`, newTodo);
      await populateTodos();
      setNewTodoDescription('');
    } else {
      alert('Invalid Todo input!');
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <div className='has-background-gradient'>
            <h2>Today</h2>
            {today.toLocaleDateString("en-UK", dateOptions)}
          </div>
          <div>
            <Table isFullwidth isHoverable isHorizontal isBordered>
              <thead><tr><th>Done</th><th>Description</th></tr></thead>
              <tbody>
                {
                  Object.keys(todoItems).map((item) => (<TodoItem key={todoItems[item].id} {...todoItems[item]} />))
                }
                <tr>
                  <td>{<input type="checkbox" disabled></input>}</td>
                  <td width={'100%'}>
                    <input className="text" placeholder='Enter new to-do here' id='newTodoDescription' type='text' value={newTodoDescription} onChange={(event) => { setNewTodoDescription(event.currentTarget.value) }} >
                    </input>
                    </td>
                </tr>
              </tbody>
            </Table>
            <Button variant='primary' >Submit</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Todo;