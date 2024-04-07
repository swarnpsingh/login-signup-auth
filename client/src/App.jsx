import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    fetchUsernames();
  }, []);

  async function fetchUsernames() {
    try {
      const response = await fetch('http://localhost:1337/api/users');
      const data = await response.json();
      setUsernames(data);
    } catch (error) {
      console.error('Error fetching usernames:', error);
    }
  }

  return (
    <>
      <div style={{ backgroundColor: "#242526" }} className="text-white">
        <div className="flex flex-col justify-center items-center h-screen gap-16">
          <div>
            <h1 className="text-4xl tracking-wider">Registered User List:</h1>
            <ul className="text-xl flex flex-col my-4">
              {usernames.map(username => (
                <li key={username} className="border-2 border-white w-full align-middle p-3 flex justify-between">{username}<Link to='/password-reset' className='text-green-200'>Change password</Link></li>
              ))}
            </ul>
          </div>
          <div className="flex gap-16">
            <Link to="/register" className="hover:opacity-85">
              <p className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-4 rounded-lg text-4xl text-white">
                Register
              </p>
            </Link>
            <Link to="/login" className="hover:opacity-85">
              <p className="bg-gradient-to-r from-purple-500 to-pink-500 py-3 px-4 rounded-lg text-4xl text-white">
                Login
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
