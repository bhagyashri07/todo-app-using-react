import React, { useState, useEffect } from "react";



const dataFromLS = () => {
  const data = localStorage.getItem("tasks");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

const TODO = () => {

  const [tasks, setTasks] = useState(dataFromLS());

  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  
  const handleTasks = (e) => {
    e.preventDefault();
    let task = {
      title,
      desc,
      date,
      completed: false,
    };
    setTasks([...tasks, task]);
    setTitle("");
    setDesc("");
    setDate("");
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (i) => {
    const filteredTasks = tasks.filter((element, index) => {
      return index !== i;
    });
    setTasks(filteredTasks);
  };

  const toggleComplete = (i) => {
    const updatedTasks = tasks.map((ele, index) => {
      if (index === i) {
        ele.completed = !ele.completed;
      }
      return ele;
    });

    setTasks(updatedTasks);
  };

  return (
    <header className="header">
    <div className="container-fluid">
      
        <div className="col-md-6">
          <div className="todoContainer">
            
              <form>
                <h1 className="subhead">To Do List</h1>
                <label className="head">Title :</label>
                <br/>
                <input
                
                  className="inputs col-xs-3"
                  type="text"
                  placeholder="Enter Your Task"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
               <br/>
               <label  className="head">Description :</label>
               <br/>
                <textarea
                  className="inputs col-xs-4"
                  rows="5"
                  placeholder="Description of Task"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                />
                <br/>
                <label  className="head"> Select Due date :</label>
                <br/>
                <input
                  type="date"
                  className="inputs mt-1"
                  onChange={(e) => setDate(e.target.value)}
                  value={date}
                />
                <br/>
                <div className="button_con mt-2">
                  <br/>
                  <button className="btn-add" onClick={handleTasks}>
                    
                    Add
                  </button>
                </div>
              </form>
            
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          {tasks.length > 0 && (
            <>
              <div className="list_container m-3">
              <h2 className="subhead-2"> Task List :</h2>
                {tasks.map((ele, i) => {
                  let date1 = new Date();
                  let datePassed;
                  let date2 = new Date(ele.date); date2.setDate (date2.getDate () + 1);
                  if (date1.getTime() < date2.getTime()) datePassed = false;
                  else if (date1.getTime() > date2.getTime()) datePassed = true;

                  return (
                    <div key={i}>
                      <div
                        className=" row list_box p-2 m-2"
                        style={{
                          border:
                            datePassed === true && ele.completed === false
                              ? "5px solid yellow"
                              : "5px solid #007ACC",
                        }}
                      >
                        <div className="d-flex col-1 justify-content-center align-items-center mx-2">
                          <button className="check_box">
                            <input
                              type="checkbox"
                              checked={ele.completed}
                              onChange={() => toggleComplete(i)}
                            />
                          </button>
                        </div>
                        <div className=" col-7 task_item px-2">
                          <dt
                            style={{
                              textDecoration:
                                ele.completed === true
                                  ? "line-through"
                                  : "none",
                            }}
                          >
                            {" "}
                            {ele.title}
                          </dt>
                          <dl
                            style={{
                              textDecoration:
                                ele.completed === true
                                  ? "line-through"
                                  : "none",
                            }}
                          >
                            {ele.desc}
                          </dl>
                          <p
                            style={{
                              textDecoration:
                                ele.completed === true
                                  ? "line-through"
                                  : "none",
                            }}
                          >
                            {ele.date}{" "}
                          </p>
                        </div>
                        <div className="col-3 d-flex justify-content-center align-items-center deletebtn_con mx-2">
                          <button
                            className="btn btn-danger"
                            onClick={() => deleteTask(i)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="alert_text"> {datePassed === true && ele.completed === false ? "Due date passed" : ""} </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          <br/>
          {tasks.length < 1 && <div className="task-added"> No Tasks Added Yet !!</div>}
        </div>
    
    </div>
    </header>
  );
};

export default TODO;