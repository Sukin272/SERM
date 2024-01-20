import { useEffect, useState } from "react";
import React from "react";

function Borrow() {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    email: "",
    item: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch("http://localhost:4000/borrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data start");
        console.log(data);
        console.log("data end");
        setFormData({
          name: "",
          rollno: "",
          email: "",
          item: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  let [items, setitems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/equipment")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((element) => {
          setitems((items) => [...items, element.EquipName]);
        });
      });
  }, []);

  return (
    <div>
      <h1>Borrow</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Roll no:
          <input
            type="text"
            name="rollno"
            value={formData.rollno}
            onChange={handleChange}
          />
        </label>
        <label>
          Email id:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Item:
          <select name="item" value={formData.item} onChange={handleChange}>
            {items.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Borrow;
