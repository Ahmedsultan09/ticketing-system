import React from "react";
import AllUsers from "./allUsers";

function Users() {
  return (
    <main className="w-full min-h-screen relative">
      <div className="w-full min-h-screen flex flex-row">
        <AllUsers />
      </div>
    </main>
  );
}

export default Users;