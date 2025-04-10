'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function UserSync() {
  const { isSignedIn, user } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      if (!user || synced) return;

      console.log('Attempting to sync user:', {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        name: user.firstName || user.fullName
      });

      try {
        const res = await fetch(`api/save-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress?.emailAddress,
            name: user.firstName || user.fullName,
            token: user.id,
          }),
        });

        const data = await res.json();
        
        if (res.ok) {
          console.log('User synced with DB:', data);
          setSynced(true);
        } else {
          console.error('Failed to sync user:', data);
        }
      } catch (err) {
        console.error('Sync error:', err);
      }
    };

    if (isSignedIn && user) {
      console.log('User is signed in, syncing...');
      syncUser();
    } else {
      console.log('User not signed in or not loaded yet');
    }
  }, [isSignedIn, user, synced]);

  return null;
}