import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const [sessionId, setSessionId] = useState(null);
  const location = useLocation();

  const saveTransactionDetails = async (sessionId) => {
    try {
      const response = await fetch("http://localhost:5000/api/stripe/save-transaction-details/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        console.log("[SUCCESS] Transaction Details saved successfully");
      } else {
        console.log("[FAILURE] Failed to save Transaction Details");
      }
    } catch (error) {
      console.error("[ERROR] : ", error);
    }
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const session_id = urlSearchParams.get("session_id");
    setSessionId(session_id);
    saveTransactionDetails(session_id);
  }, [location.search]);

  return (
    <div>
      <h1>Payment Successful</h1>
    </div>
  );
};

export default SuccessPage;
