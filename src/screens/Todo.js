import { Container, Button, Form, FormCheck } from "@govtechsg/sgds-react";
import Table from "../components/Table";

function Todo() {
  const today = new Date();
  const dateOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
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
                ></input>
              </td>
            </tr>
          </tbody>
        </Table>
      </Form>
      <Button size="sm" variant="primary">
        Add
      </Button>
    </Container>
  );
}

export default Todo;