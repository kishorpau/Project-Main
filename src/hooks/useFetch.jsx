import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const createData = async (newData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, newData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData((prevData) => [...prevData, response.data]);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${url}/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${url}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (err) => {
    if (err.response) {
      console.error("Error response:", err.response.data);
      setError(
        `Server error: ${err.response.status} - ${err.response.data.message}`
      );
    } else if (err.request) {
      console.error("Error request:", err.request);
      setError("Network error: No response from server.");
    } else {
      console.error("Error message:", err.message);
      setError(`Error: ${err.message}`);
    }
  };

  return { data, loading, error, createData, updateData, deleteData };
};

export default useFetch;
