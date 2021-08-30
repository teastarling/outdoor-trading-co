import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    })
  };


  return (
    <Modal.Body>
      <div className="login">
        <div className="login-triangle"></div>
        {data ? (
          <p>
            Success!
          </p>
        ) : (
          <form onSubmit={handleFormSubmit} className="login-container">
            <div className="m-1">
              <label for="exampleFormControlInput1" className="form-label">
                <b className="text-white">Email</b>
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Enter email"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <div className="m-1">
              <label for="exampleFormControlInput2" className="form-label">
                <b className="text-white">Password</b>
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Enter password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
            <Modal.Footer>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" />
                  <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
              </div>
              <button
                onClick={showModal}
                type="submit"
                className="search-btn btn-md"
              >
                Sign In
            </button>
              <Modal show={isOpen} onHide={hideModal} />
              <button
                className="search-btn btn-md"
                onClick={hideModal}
              >
                Cancel
            </button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </Modal.Footer>
          </form>
        )}
        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
    </Modal.Body>
  );
};

export default Login;