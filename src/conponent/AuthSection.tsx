import { useState } from 'react';
import { signIn, signOut, getCurrentUser } from 'aws-amplify/auth';

export default function AuthSection() {
  const [user, setUser] = useState<any>(null);

  async function handleSignIn() {
    const username = window.prompt("Username (email):");
    const password = window.prompt("password:");
    if (username && password) {
      await signIn({ username, password });
      setUser(await getCurrentUser());
    }
  }

  async function handleSignOut() {
    await signOut();
    setUser(null);
  }

  return (
    <>
    {user ? (
      <div>
        <p>{user.username}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    ):(
      <button onClick={handleSignIn}>Sign In</button>
    )}
    </>
  );
}