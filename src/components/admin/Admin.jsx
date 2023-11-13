import React, { useState, useEffect, useRef } from "react";
import Menubar from "../MenuBar/MenuBar";
import { getLocal } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../api/api";
import jwt_decode from "jwt-decode";
import {
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import $ from "jquery";
import { Button, Modal, Form } from "react-bootstrap";

function Admin() {
  const token = getLocal();
  const navigate = useNavigate();
  const editModalRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false); // State to control edit modal
  const [editUserIndex, setEditUserIndex] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getUserlist() {
    const request = await axios.get(`${baseUrl}user-list/`);
    setUsers(request.data);
    console.log("ashiquwwwwwwwwwwwwwwwwww");
  }

  useEffect(() => {
    const decoded = jwt_decode(token);
    if (!decoded) {
      navigate("/");
    } else if (!decoded.is_admin) {
      navigate("/");
    }
    getUserlist();
  }, [navigate, token]);

  const toggleEditModal = (index) => {
    setEditUserIndex(index);
    setEditModalOpen(!editModalOpen);
  };
  const updateUserListAfterDelete = (index) => {
    const updatedUsers = users.filter((user) => user.id !== index);
    setUsers(updatedUsers);
  };

  const AddUserRegister = async (e) => {
    e.preventDefault();

    const data = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password1: e.target.password1.value,
    };

    if (data.username === "") {
      setUsernameError("Username cannot be blank");
      setEmailError("");
      setPasswordError("");
      return;
    }

    const usernameExists = users.some(
      (user) => user.username === data.username
    );
    if (usernameExists) {
      setUsernameError("Username is already taken");
      setEmailError("");
      setPasswordError("");
      return;
    }

    if (data.email === "") {
      setUsernameError("");
      setEmailError("Email cannot be blank");
      setPasswordError("");
      return;
    }

    if (data.password !== data.password1) {
      setUsernameError("");
      setEmailError("");
      setPasswordError("Password doesn't match");
      return;
    }

    // Perform the registration request
    const response = await fetch(`${baseUrl}user-register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      const errorData = await response.json();
      setUsernameError(errorData.username);
      setEmailError(errorData.email);
      setPasswordError("");
    } else {
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      getUserlist();
      navigate("/admin");
      handleClose();
      toast.success("User Added Successfully");
    }
  };

  const EditFrom = async (index, e) => {
    const result = users.find((user, i) => i === index);
    e.preventDefault();
    const data = [
      e.target.username.value,
      e.target.email.value,
      e.target.password.value,
    ];
    if (data[0] === "") {
      data[0] = result.username;
    }
    if (data[1] === "") {
      data[1] = result.email;
    }
    if (data[2] === "") {
      alert("Please enter Old Password or New password");
      return;
    }
    const id = result.id;
  
    try {
      const response = await fetch(`${baseUrl}user-detail/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data[0],
          email: data[1],
          password: data[2],
        }),
      });
  
      if (response.status === 400) {
        alert(response.status);
        navigate("/admin");
      } else {
        // Update the user's data in the state
        const updatedUsers = [...users];
        updatedUsers[index] = {
          ...result,
          username: data[0],
          email: data[1],
        };
        setUsers(updatedUsers);
        navigate("/admin");
  
        // Close the edit modal
        if (editModalRef.current) {
          editModalRef.current.hide();
        }
  
        toast.success("User Updated Successfully");
      }
    } catch (error) {
      console.error(error);
      navigate("/admin");
      // Handle the error here (e.g., show an error message)
    }
  };
  

  const searchUser = async (keyword) => {
    if (!keyword == "") {
      const request = await axios.get(`${baseUrl}user-list/?search=${keyword}`);
      setUsers(request.data);
    } else {
      getUserlist();
    }
  };

  const deleteUser = async (index, e) => {
    e.preventDefault();
    const response = await fetch(`${baseUrl}user-detail/${index}/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (response.status === 400) {
      alert(response.status);
      navigate("/admin");
    } else {
      navigate("/admin");
      getUserlist();
    }
  };

  return (
    <div>
      <Menubar heading={"Admin page"} />
      <div class="d-flex justify-content-end container-fluid">
        <Button
          variant="primary"
          className="btn btn-warning me-3 my-3"
          onClick={handleShow}
        >
          Add User
        </Button>
        <input
          type="text"
          class="form-control w-25 my-2 ms-auto"
          onChange={(e) => searchUser(e.target.value)}
          placeholder="Search here"
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>{usernameError}
          {passwordError}
          {emailError}</p>
          <div class="modal-content">
            <Form onSubmit={(e) => AddUserRegister(e)}>
              <div style={{ display: "block", width: 470, padding: 20 }}>
                <Form.Group className="py-2">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                  />
                </Form.Group>
                <Form.Group className="py-2">
                  <Form.Control type="email" name="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="py-2">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group className="py-2">
                  <Form.Control
                    type="password"
                    name="password1"
                    placeholder="Confirm Password"
                  />
                </Form.Group>
              </div>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Add User
                </Button>
              </Modal.Footer>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
      <div class="card cards recent-sales overflow-auto mx-3">
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Is active</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="https://mdbootstrap.com/img/new/avatars/8.jpg"
                        alt=""
                        style={{ width: "45px", height: "45px" }}
                        className="rounded-circle"
                      />
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-muted mb-0">{user.email}</p>
                  </td>
                  <td>
                    {user.is_active ? (
                      <MDBBadge color="primary" pill>
                        NO Active
                      </MDBBadge>
                    ) : (
                      <MDBBadge color="success" pill>
                        Active
                      </MDBBadge>
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target={`#exampleModal${index}`}
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <div
                      className="modal fade"
                      id={`exampleModal${index}`}
                      ref={editModalRef}
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <Form onSubmit={(e) => EditFrom(index, e)}>
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Edit User
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <Form.Group className="py-2">
                                <Form.Control
                                  type="text"
                                  name="username"
                                  placeholder="Username"
                                  defaultValue={user.username}
                                />
                              </Form.Group>
                              <Form.Group className="py-2">
                                <Form.Control
                                  type="email"
                                  name="email"
                                  placeholder="Email"
                                  defaultValue={user.email}
                                />
                              </Form.Group>
                              <Form.Group className="py-2">
                                <Form.Control
                                  type="password"
                                  name="password"
                                  placeholder="Password"
                                />
                              </Form.Group>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                              <button type="submit" className="btn btn-primary">
                                Update
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => deleteUser(user.id, e)}
                      className="btn btn-danger ms-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </MDBTableBody>
        </MDBTable>
      </div>
    </div>
  );
}

export default Admin;
