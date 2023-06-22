import React from "react";

export default ({ user }) => {
  return (
    <li>
      {user.firstName} {user.lastName} - {user.role}
    </li>
  );
};
