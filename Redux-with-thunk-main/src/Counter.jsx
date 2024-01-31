
import React, { useState } from "react";
import { applyMiddleware, createStore } from "redux";
import reducer from "./Reducers"; 
import { fetchUserData, showError } from "./Actions"; 
import thunk from "redux-thunk"; 
import axios from "axios"


const store = createStore(reducer, applyMiddleware(thunk));


function fetchData() {
  return function () {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const users = res.data;
        store.dispatch(fetchUserData(users));
      })
      .catch((error) => {
        store.dispatch(showError(error.message));
      });
  };
}

export default function Counter() {
  const [data, setData] = useState([]);

  store.subscribe(() => {
    setData(store.getState().users);
  });

  const reset = () =>{
    setData([])
  }
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <div>
            <h3>{item.name}</h3>
            <h4>{item.email}</h4>
          </div>
          <hr></hr>
        </div>
      ))}
      {
        data.length==0 ? <button className="button1" onClick={() => store.dispatch(fetchData())}>Fetch Data</button> : null
      }
      {
        data.length!=0 ? <button className="button1" onClick={reset}>Close</button> : null
      }
    </div>
  );
}
