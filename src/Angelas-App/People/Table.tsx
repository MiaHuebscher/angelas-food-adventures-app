import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import PeopleDetails from "./Details";
import { useSelector } from "react-redux";

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [access, setAccess] = useState("");
  const [name, setName] = useState("");
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  const filterUsersByAccess = async (access: string) => {
    setAccess(access);
    if (access) {
      const users = await client.findUsersByAccess(access);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const users = await client.findUsersByPartialName(name);
      setUsers(users);
    } else {
      fetchUsers();
    }
  };
  const createUser = async () => {
    const user = await client.createUser({
      _id: new Date().getTime().toString(),
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      access: "READ-ONLY",
      numRestsAdded: 0,
      favCuisines: []
    });
    setUsers([...users, user]);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div id="wd-people-table" className="m-4">
      {(currentUser.firstName === 'Angela' && currentUser.lastName === "Todd") &&
      <button onClick={createUser} className="float-end btn custom-button-design">
        <FaPlus className="me-2" /> Add User
      </button>}
      <input onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
             className="form-control float-start w-25 me-2" />
      <select value={access} onChange={(e) =>filterUsersByAccess(e.target.value)} className="form-select float-start w-25" >
        <option value="">All Access Types</option>        
        <option value="READ-ONLY">Read Only</option>
        <option value="READ-WRITE">Read & Write</option>
        <option value="READ-WRITE-DELETE">Read, Write, & Delete</option>
      </select>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Login ID</th><th>Access Type</th><th># of Restaurants Added</th><th>Favorite Cuisine(s)</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="text-nowrap"> 
                {(currentUser.firstName === 'Angela' && currentUser.lastName === "Todd") ?
                <Link to={`/People/${user._id}`} 
                      className="custom-color text-decoration-none"  >
                      <PeopleDetails fetchUsers={fetchUsers} />
                  {user.firstName} {user.lastName}
                </Link> : <span className="custom-color">{user.firstName} {user.lastName}</span>} 
              </td>
              <td>{user._id}</td><td>{user.access}</td><td>{user.numRestsAdded}</td><td>{user.favCuisines}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}