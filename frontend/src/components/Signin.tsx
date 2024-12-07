import axios from "axios";
import { useState } from "react";

const Signin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      <input
        style={{
          height: "1rem",
          padding: "0.5rem",
          borderRadius: "5px",
        }}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Enter Username"
      />
      <input
        style={{
          height: "1rem",
          padding: "0.5rem",
          borderRadius: "5px",
        }}
        type="text"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter Password"
      />
      <button
        onClick={async () => {
          const resp = await axios.post(
            "http://localhost:3000/signin",
            { username, password },
            {
              withCredentials: true,
            }
          );
          alert(resp.data);
        }}
      >
        Submit
      </button>
      <button
        onClick={async () => {
          const resp = await axios.post("http://localhost:3000/signout", {
            withCredentials: true,
          });
          alert(resp.data);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default Signin;
