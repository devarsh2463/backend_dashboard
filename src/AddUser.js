import { useState } from "react";

function AddUser({ onUserAdded, onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/addUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("Add User Response:", data);

      if (response.ok) {
        alert("User added successfully!");
        onUserAdded();
      } else {
        alert(
          data.errorMessage ||
            data.message ||
            "Unable to add user"
        );
      }
    } catch (error) {
      console.log("Add User Error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="add-user-modal">

        <div className="add-user-header">
          <h2>Add User</h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleAddUser}>

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>

            <input
              type="tel"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
          >
            Add User
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddUser;