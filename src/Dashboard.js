import { useEffect, useState } from "react";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Get Users
  const getUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/getUser",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const data = await response.json();

      console.log("Users:", data);

      if (response.ok) {
        setUsers(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("Get Users Error:", error);
    }
  };

  // Page load par users get honge
  useEffect(() => {
    getUsers();
  }, []);

  // Edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditUser(true);
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/deleteUser/" + id,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("User deleted successfully!");
        getUsers();
      } else {
        alert(
          data.errorMessage ||
            data.message ||
            "Unable to delete user"
        );
      }
    } catch (error) {
      console.log("Delete Error:", error);
      alert("Unable to connect to server");
    }
  };

  // Add/Edit ke baad list refresh
  const handleUserChanged = () => {
    getUsers();

    setShowAddUser(false);
    setShowEditUser(false);
    setSelectedUser(null);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>

        <div>
          <button
            className="add-user-btn"
            onClick={() => setShowAddUser(true)}
          >
            + Add User
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Total Users */}
      <div className="card">
        <h2>Total Users</h2>
        <h1>{users.length}</h1>
      </div>

      {/* Users List */}
      <div className="users-section">

        <h2>Users List</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>{user.phone}</td>

                <td>{user.address}</td>

                <td>
                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(user._id)
                      }
                    >
                      Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <p className="no-users">
            No users found.
          </p>
        )}

      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <AddUser
          onUserAdded={handleUserChanged}
          onClose={() => setShowAddUser(false)}
        />
      )}

      {/* Edit User Modal */}
      {showEditUser && selectedUser && (
        <EditUser
          user={selectedUser}
          onUserUpdated={handleUserChanged}
          onClose={() => {
            setShowEditUser(false);
            setSelectedUser(null);
          }}
        />
      )}

    </div>
  );
}

export default Dashboard;