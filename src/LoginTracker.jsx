import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/react";

const API_URL = "http://localhost:5000";

function LoginTracker() {
  const { isSignedIn, userId, sessionId } = useAuth();
  const hasRecorded = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !userId || !sessionId) return;

    if (hasRecorded.current) return;

    const recordLogin = async () => {
      try {
        const response = await fetch(`${API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: userId,
            sessionId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to record login");
        }

        hasRecorded.current = true;

      } catch (error) {
        console.error("❌ Failed to record login:", error);
      }
    };

    recordLogin();
  }, [isSignedIn, userId, sessionId]);

  return null;
}

export default LoginTracker;