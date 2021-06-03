import React, { useRef } from "react";
import { v4 as uuidV4 } from "uuid";
const Login = ({ onIdSubmit }) => {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onIdSubmit(idRef.current.value);
  };

  function createNewId() {
    onIdSubmit(uuidV4());
  }

  return (
    <>
      <div className="container py-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Enter your id</label>
            <input
              type="text"
              ref={idRef}
              className="form-control"
              placeholder="Enter your id"
            />
            <div className="pt-2">
              <button className="btn btn-primary ">Login</button>
              <button
                type="button"
                className="btn btn-dark mx-3"
                onClick={createNewId}
              >
                Get a ID
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
