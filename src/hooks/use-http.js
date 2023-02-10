import { useState, useCallback } from "react";
import {HTTP_REQUEST_ERROR, UNEXPECTED_ERROR} from "../constants/error-messages";
 
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData, id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error(HTTP_REQUEST_ERROR);
      }

      if (requestConfig.method === "GET" || requestConfig.method === "POST") {
        const data = await response.json();
        applyData(data);
      }

      if (requestConfig.method === "DELETE") {
        applyData(id);
      }

      if (requestConfig.method === "PUT") {
        const data = await response.json();
        applyData(id,data);
      }
    } catch (err) {
      setError(err.message || UNEXPECTED_ERROR);
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
