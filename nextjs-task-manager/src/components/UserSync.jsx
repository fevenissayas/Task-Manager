'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function UserSync() {
  const { isSignedIn } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    const syncUser = async () => {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
        });

        if (res.ok) {
          console.log('✅ User synced with DB');
          setSynced(true);
        } else {
          console.error('❌ Failed to sync user:', await res.text());
        }
      } catch (err) {
        console.error('❌ Sync error:', err);
      }
    };

    if (isSignedIn && !synced) {
      syncUser();
    }
  }, [isSignedIn, synced]);

  return null; // no UI needed
}
