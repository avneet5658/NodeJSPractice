import Icon from "@iconify/react";
import React, { useState } from "react";
import Modal from "react-modal";
import edit from "@iconify/icons-mdi/account-edit-outline";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function UpdateModal({ user, index, handleUpdate }) {
  var subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({
    name: user.name,
    email: user.email,
    contact: user.contact,
  });
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Icon
        onClick={openModal}
        icon={edit}
        height="30px"
        className="mx-1"
        style={{ cursor: "pointer" }}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Details</h2>
        <form>
          <input
            type="text"
            value={updatedDetails.name}
            className="form-control"
            placeholder="Your Name"
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, name: e.target.value })
            }
          />
          <br />
          <input
            type="email"
            value={updatedDetails.email}
            className="form-control"
            placeholder="email"
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, email: e.target.value })
            }
          />
          <br />

          <input
            type="text"
            value={updatedDetails.contact}
            className="form-control"
            placeholder="contact"
            onChange={(e) =>
              setUpdatedDetails({ ...updatedDetails, contact: e.target.value })
            }
          />
          <br />
          <div className="d-flex">
            <button
              className="btn btn-success"
              onClick={() => {
                closeModal();
                handleUpdate(user._id, index, updatedDetails);
              }}
            >
              Update
            </button>
            &nbsp;
            <button
              onClick={closeModal}
              type="button"
              className="btn btn-success"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
export default UpdateModal;
