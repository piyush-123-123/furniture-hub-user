import { useState, useCallback } from "react";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async ({
      url,
      method = "GET",
      body = null,
      headers = {
        "Content-Type": "application/json",
      },
    }) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || "Something went wrong");
        }

        return data;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    sendRequest,
    loading,
    error,
  };
};

export default useApi;