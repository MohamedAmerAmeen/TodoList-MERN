import React, { useState, useEffect } from "react";
import CreateTask from "../modals/CreateTask";
import Card from "./Card";
import axios from "axios";
import Swal from "sweetalert2";

const TodoList = () => {
  const [data, setData] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    fetchData();
    console.log(data.posts);
  }, [data]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8080/feed/posts/${id}`)
          .then((response) => {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", "Your task cannot be deleted.", "error");
            console.log(error);
          });
      }
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/feed/posts"); // Replace with your API endpoint
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsFetched(true);
  };

  return (
    <>
      <div className="header text-center">
        <h3>Todo List</h3>
        <button
          className="btn btn-primary mt-2"
          onClick={() => {
            setModal(true);
          }}
        >
          Create Task
        </button>
      </div>

      <div className="task-container">
        {data.posts?.map((items, index) => (
          <>
            <Card
              key={Math.random()}
              taskObj={items}
              index={index}
              deleteTask={() => handleDelete(items._id)}
            />
          </>
        ))}
      </div>

      <CreateTask modal={modal} toggle={toggle} />
    </>
  );
};

export default TodoList;
