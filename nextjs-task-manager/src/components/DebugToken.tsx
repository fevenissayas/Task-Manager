import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const DebugToken = () => {
  const { getToken, userId } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  const fetchToken = async () => {
    const fetchedToken = await getToken();
    setToken(fetchedToken);
  };

  return (
    <div>
      <h1>Debug Clerk Token</h1>
      <button onClick={fetchToken}>Fetch Token</button>
      {token && (
        <div>
          <p><strong>Token:</strong> {token}</p>
          <p><strong>User ID:</strong> {userId}</p>
        </div>
      )}
    </div>
  );
};

export default DebugToken;