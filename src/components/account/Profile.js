import React, { useContext, useState, Fragment } from "react";
import Spinner from "../layout/Spinner";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";
import PropTypes from "prop-types";

import Modal from "react-modal";

import "./account.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    marginTop: "0px",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const Profile = ({ user, showButton }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { isAuthenticated, loading, login, error, updateUser } = authContext;
  const { setAlert } = alertContext;

  const [edit, setEdit] = useState(false);

  const onEdit = () => {
    setEdit(!edit);
  };

  const [userEdited, setUserEdited] = useState({
    username: user ? user.username : "",
    firstname: user ? user.firstname : "",
    lastname: user ? user.lastname : "",
    email: user ? user.email : "",
  });

  const { username, firstname, lastname, email } = userEdited;

  const onChange = (e) =>
    setUserEdited({ ...userEdited, [e.target.name]: e.target.value });

  const [password, setPass] = useState("");

  const changePass = (e) => setPass(e.target.value);

  const onSubmit = (e) => {
    if (password === "") {
      setAlert("Please enter your password.", "warning");
    } else if (error) {
      setAlert(error, "danger");
    } else {
      // let loginEmail = user.email;
      login({ email: user.email, password });
      // update on backend with edited formdata if login works
      if (isAuthenticated && !loading) {
        updateUser(userEdited, user.user_id);
        setEdit(!edit);
      }
    }
    closeModal();
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return !loading ? (
    <div>
      <div>
        <h2 className="editHeader">
          {edit ? "Edit Profile" : "Account Profile"}
        </h2>
        {edit ? (
          <Fragment>
            <input
              type="text"
              value={username}
              name="username"
              onChange={onChange}
              className="editInput"
              placeholder="Username..."
              required
            />
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={onChange}
              className="editInput"
              required
            />
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={onChange}
              className="editInput"
              required
            />
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChange}
              className="editInput"
              placeholder="Email..."
              required
            />
            <Fragment>
              <button className="btn btn-secondary mr-2" onClick={openModal}>
                Edit
              </button>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Confirm with Password"
              >
                <h2>Confirm Profile Edit</h2>
                <form className="modalForm">
                  <input
                    type="text"
                    name="password"
                    value={password}
                    onChange={changePass}
                    placeholder="Account Password..."
                    required
                  />
                </form>
                <div className="buttonContainer">
                  <button
                    onClick={onSubmit}
                    className="btn btn-primary modalButtons"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn btn-danger modalButtons"
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
              <button className="btn btn-danger" onClick={onEdit}>
                Cancel
              </button>
            </Fragment>
          </Fragment>
        ) : (
          <Fragment>
            <p className="solid">
              <span className="lab">Username</span>
              <span>{user && user.username}</span>
            </p>
            <p className="solid">
              <span className="lab">First Name</span>
              <span>{user && user.firstname}</span>
            </p>
            <p className="solid">
              <span className="lab">Last Name</span>
              <span>{user && user.lastname}</span>
            </p>
            <p className="solid">
              <span className="lab">Email</span>
              <span>{user && user.email}</span>
            </p>
            {showButton && (
              <button className="btn btn-secondary" onClick={onEdit}>
                Edit
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};
Profile.propTypes = {
  showButton: PropTypes.bool.isRequired,
};

export default Profile;
