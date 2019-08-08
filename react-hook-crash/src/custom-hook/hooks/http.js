import { useState, useEffect } from "react";

export const useHttp = (url, defendencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    console.log("sending http request to " + url);
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(data => {
        setIsLoading(false);
        setFetchedData(data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, defendencies);

  return [isLoading, fetchedData];
};
