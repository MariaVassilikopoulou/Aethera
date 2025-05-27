'use client';

import { useEffect, useState } from 'react';
interface UserProfile {
    name: string;
    email: string;
    role?: string;
  }
export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile  | null>(null);

  useEffect(() => {
    // Simulate fetching user data (replace with real API call)
    const stored = localStorage.getItem('accessToken');
    if (!stored) return;

    // Replace this with a fetch call to your .NET Core backend
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
    });
  }, []);

  if (!user) {
    return <p>Loading your profile...</p>;
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Your Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.role && <p><strong>Role:</strong> {user.role}</p>}
    </main>
  );
}
