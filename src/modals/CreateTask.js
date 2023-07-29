import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const CreateTask = ({ modal, toggle }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const handleChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/feed/posts", {
        title: taskName,
        content: taskDescription,
      });
      Swal.fire("Great! Go Ahead", "New Task Is Added", "success");
      toggle();
      setTaskName("");
      setTaskDescription("");
    } catch (error) {
      console.error("Error inserting data:", error);
      Swal.fire(
        "Error",
        "Please Enter Task Of Minimum length of 5 character",
        "error"
      );
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Task Details</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label>Task Title:</label>
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={handleChange(setTaskName)}
                name="taskName"
              />
            </div>
            <div className="form-group">
              <label>Task Description:</label>
              <textarea
                rows="5"
                className="form-control"
                value={taskDescription}
                onChange={handleChange(setTaskDescription)}
                name="taskDescription"
              ></textarea>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Create
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateTask;
