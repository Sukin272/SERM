import { useEffect, useState } from "react";
import React from "react";
import ReactDOM from "react-dom";
import "./Home.css";

function EquipDisplay(props) {

  const eq=props.equipments;
  return (
    <div className="Equipment-div">
      <div>
        {eq.EquipName}
      </div>
      <div>
        {eq.QuantityAvail}
      </div>
      <div>
        {eq.TotalQuantity}
      </div>
    </div>
  );
}

function Home() {
  let [equipments, setEquipments] = useState([]);
  // send get request to backend
  useEffect(() => {
    fetch("http://localhost:4000/equipment")
      .then((response) => response.json())
      .then((data) => setEquipments(data));
  }, []);

  return (
    <div>
      {equipments.map((equipment, index) => (
        <div key={index}>
          <EquipDisplay equipments={equipment} />
        </div>
      ))}
    </div>
  );
}

export default Home;
