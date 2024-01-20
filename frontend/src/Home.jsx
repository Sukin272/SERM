import { useEffect, useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import "./Home.css"


function EquipDisplay(props) {
  return (
    <div className="Equipment-div">
      <h1>{props.name}</h1>
      <p>{props.count}</p>
    </div>
  );

}


function Home() {

  let [equipments, setEquipments] = useState({}); 
  // send get request to backend
  useEffect(() =>{
  fetch("http://localhost:4000/equipment")
    .then(response => response.json())
    .then(data => setEquipments(data));
  }, []);

  return (
    <div>
      {Object.entries(equipments).map(([equipment, quantity], index) => (
        <div key={index}>
          <EquipDisplay name={equipment} count={quantity}/>
        </div>
      ))}
    </div>
  );
}

export default Home;