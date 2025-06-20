import axios from "axios";
import { useEffect, useState } from "react";

interface IUseFetch {
  url: string,
}

interface IData{
  success:boolean,
  data:[]
}

const useFetch = ({ url }: IUseFetch) => {
  // Use the correct environment variable name
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  const [data, setData] = useState<IData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Ensure apiUrl is defined before using it
        if (!apiUrl) {
          throw new Error("API URL is not defined");
        }
        
        const res = await axios.get(`${apiUrl}${url}`);
        if(res.data.success){
          setData(res.data.data);
          setLoading(false);
          setError("");
        }
      } catch (err: any) {
        if (err && err.message) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }

      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);

    try {
      if (!apiUrl) {
        throw new Error("API URL is not defined");
      }
      const res = await axios.get(`${apiUrl}${url}`);
      if(res.data.success){
        setData(res.data.data);
        setLoading(false);
        setError("");
      }
    } catch (err: any) {
      if (err && err.message) {
                  setError(err.message);

      } else {
        setError("An unexpected error occurred");
      }
    }
    setLoading(false);
  };

  return { data, error, loading, reFetch };
};

export default useFetch;
