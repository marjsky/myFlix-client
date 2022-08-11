import React from 'react';

export function UserInfo({ email, name}) {
  return (
    <div>
      <p>User: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserInfo;