import { useState } from "react";

export const Test = () => {
  const [data, setData] = useState('');

  const dataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };


  return (
    <div className="test">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email</span>
          <input type="email" name="email" onChange={dataChange} />
        </label>
        <br />
        <label>
          <span>Number</span>
          <input type="number" name="number" onChange={dataChange} />
        </label>
        <br />
        <label>
          <span>Email</span>
          <input type="date" name="birthday" onChange={dataChange} />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </div>
  )
};