import axios from "axios";
import { useEffect, useState } from "react";

import { Container, Button, Form, FormCheck } from "@govtechsg/sgds-react";

import CONFIG from "../config";
import Table from "../components/Table";
import crossIcon from "../icons/cross.svg";

// export type TodoItem = {
//   id: string;
//   description: string;
//   done: boolean;
// }

// export type TodoItemProps = {
//   id: string;
//   description: string;
//   done: boolean;
//   refreshToDos: () => void;
// };

function TodoItem(props) {
  const [done, setDone] = useState(props.done);

  const updateTodoItem = (done) => {
    setDone(done)
    axios.put(`${CONFIG.API_ENDPOINT}/${props.id}`, {
      id: props.id,
      description: props.description,
      done: done,
    });
  }

  const deleteTodoItem = () => {
    axios.delete(`${CONFIG.API_ENDPOINT}/${props.id}`)
      .then(() => {
        props.refreshToDos();
      })
  }

  return (
    <>
      <tr>
        <td>
          <FormCheck
            onChange={(event) => updateTodoItem(event.currentTarget.checked)}
            checked={done}
          />
        </td>
        <td width={"100%"}>{props.description}</td>
        <td>
          <img
            alt="delete-icon"
            src={crossIcon}
            onClick={deleteTodoItem}
            className="delete-icon"
          />
        </td>
      </tr>
    </>
  );
}

function Todo() {
  const [todoItems, setTodoItems] = useState({});
  const [newTodoDescription, setNewTodoDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date();
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  }

  useEffect(() => {
    populateTodos();
  }, []);

  const populateTodos = () => {
    axios.get(`${CONFIG.API_ENDPOINT}`)
      .then((result) => {
        setTodoItems(result.data);
      })
  }

  const submitNewTodo = () => {
    setIsLoading(true);
    if (newTodoDescription.trim() !== "") {
      const newTodo = {
        description: newTodoDescription,
      };
      axios.post(`${CONFIG.API_ENDPOINT}`, newTodo).then(() => {
        populateTodos();
        setNewTodoDescription("");
      })
    } else {
      alert("Invalid Todo input!");
    }
    setIsLoading(false)
  }

  return (
    <Container>
      <div className="has-background-gradient">
        <h2>Today</h2>
        {today.toLocaleDateString("en-UK", dateOptions)}
      </div>
      <Form>
        <Table isFullwidth isHoverable isHorizontal isBordered>
          <thead>
            <tr>
              <th>Done</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(todoItems).map((item) => (
              <TodoItem
                key={todoItems[item].id}
                {...todoItems[item]}
                refreshToDos={populateTodos}
              />
            ))}
            <tr>
              <td>
                <FormCheck disabled />
              </td>
              <td width={"100%"}>
                <input
                  className="text table-input"
                  placeholder="Enter new to-do here"
                  id="newTodoDescription"
                  type="text"
                  value={newTodoDescription}
                  onChange={(event) => {
                    setNewTodoDescription(event.currentTarget.value);
                  }}
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
      <Button
        size="sm"
        variant="primary"
        onClick={submitNewTodo}
        disabled={isLoading}
      >
        {isLoading ? "loading..." : "Add"}
      </Button>
    </Container>
  );
}

export default Todo;