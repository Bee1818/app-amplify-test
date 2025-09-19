import { useState } from 'react';
import { signIn, signOut, getCurrentUser, confirmSignIn } from 'aws-amplify/auth';

export default function AuthSection() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    const username = window.prompt("Username (email):");
    const password = window.prompt("password:");
    if (!username || !password) return;

    try {
      const res = await signIn({ username, password });
      console.log('signIn result:', res);

      if (res.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        const newPassword = window.prompt('新しいパスワードを設定してください:');
        if (newPassword) {
          await confirmSignIn({ challengeResponse: newPassword });
          alert("パスワード成功。再度ログインしてください。");
        }
      }

      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setError(null);
    } catch (err: any) {
      console.error('sign in error:', err);
      setError(err.message || 'ログインに失敗しました。');
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
    {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}