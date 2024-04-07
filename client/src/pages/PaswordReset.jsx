import React, { useState } from "react";
import { Link } from "react-router-dom";

function PaswordReset() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    const response = await fetch("http://localhost:1337/api/passwordChange", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (data.status === "ok" && data.password === "deleted") {
      alert("Password Changed");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid attempt, try again");
    }
  }

  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen text-black"
        style={{ backgroundColor: "#242526" }}
      >
        <Link to="/">
          <p className="ml-72 text-xl flex items-center gap-2 text-blue-200 tracking-wide font-bold cursor-pointer mb-2 hover:opacity-85">
            <i class="fa-solid fa-arrow-left"></i>Home
          </p>
        </Link>
        <div className="flex flex-col gap-8 bg-white p-10 rounded-xl">
          <h1 className="text-5xl font-bold tracking-wide">Forgot Password</h1>
          <form onSubmit={handleSubmit} className="flex flex-col text-2xl">
            <label>Enter Email ID</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email ID"
              className="mb-4 border-2 border-black p-2"
            />
            <label>Enter New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength={6}
              maxLength={10}
              className="mb-8 border-2 border-black p-2"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-4 rounded-lg text-2xl text-white hover:opacity-85"
            >
              Submit
            </button>
            <div className="flex flex-col items-center">
              <p className="mt-2">
                <Link to="/password-reset" className="text-blue-800 font-bold">
                  Forgot Password
                </Link>{" "}
              </p>
              <p className="mt-2">
                *Try {" "}
                <Link to="/login" className="text-blue-800">
                  Login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PaswordReset;
