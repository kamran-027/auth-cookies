import axios from "axios";
import { useState } from "react";

interface User {
  iat: number;
  username: string;
  password: string;
}

const User = () => {
  const [user, setUser] = useState<User>();
  return (
    <div>
      <button
        onClick={async () => {
          const resp = await axios.get("http://localhost:3000/user", {
            withCredentials: true,
          });
          setUser(resp.data);
        }}
      >
        Get USer
      </button>
      <div>{user?.username ?? "User not found"}</div>
    </div>
  );
};

export default User;
