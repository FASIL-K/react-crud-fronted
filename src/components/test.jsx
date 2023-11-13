// import React from "react";
// import { useState } from "react";
// import { Button, Modal, Form } from "react-bootstrap";

// function Test() {
//   const [usernameError, setUsernameError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const [showEdit, setShowEdit] = useState(false);

//   const handleClose2 = () => setShowEdit(false);
//   const handleShow2 = () => setShowEdit(true);

//   return (
//     <>
//       <div>
//         <>
//           <Button
//             variant="primary"
//             className="btn btn-warning me-3 my-3"
//             onClick={() => handleShow2(true)}
//           >
//             {" "}
//             <i class="fas fa-edit"></i>{" "}
//           </Button>
//           <Modal show={showEdit} onHide={handleClose2}>
//             <Modal.Header closeButton>
//               <Modal.Title>Edit User</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               {/* <Form onSubmit={(e) => EditFrom(index, e)}> */}
//                 <Form.Group className="py-2">
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                     // defaultValue={user.username}
//                   />
//                 </Form.Group>
//                 <Form.Group className="py-2">
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     // defaultValue={user.email}
//                   />
//                 </Form.Group>
//                 <Form.Group className="py-2">
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                 </Form.Group>
//                 <Modal.Footer>
//                   <Button variant="secondary" onClick={handleClose2}>
//                     Close
//                   </Button>
//                   <Button variant="primary" type="submit">
//                     Save Changes
//                   </Button>
//                 </Modal.Footer>
//               {/* </Form> */}
//             </Modal.Body>
//           </Modal>
//         </>
//       </div>
//     </>
//   );
// }

// export default Test;
