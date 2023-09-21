import { useEffect, useState } from "react";
import User from "./components/User/User";
import "./styles.css";
import SearchBox from "./components/SearchBox/SearchBox";
import Empty from "./components/SearchBox/Empty";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  useEffect(() => {
    fetch("https://random-data-api.com/api/v2/users?size=20")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setfilteredUsers(data);
      });
  }, []);

  const filterUsers = (searchString) => {
    const filtered = users.filter((user) =>
      user.first_name.includes(searchString)
    );
    setfilteredUsers(filtered);
  };

  return (
    <div className="App">
      <SearchBox handleChange={filterUsers} />
      {filteredUsers.length === 0 ? (
        <Empty msg="No matches" />
      ) : (
        filteredUsers.map((user) => <User name={user.first_name} />)
      )}
    </div>
  );
};

module.exports = App;
