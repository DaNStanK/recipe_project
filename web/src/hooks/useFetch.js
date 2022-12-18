import { useEffect, useState } from "react";

export const useFetch = (url, method, token, passData) => {

   const [data, setData] = useState(null);
   const [isPending, setIsPending] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {

      const controller = new AbortController();

      const fetchData = async () => {
         setError(null);
         setIsPending(true);

         try {
            const res = await fetch(
               url,
               {
                  method: method,
                  body: passData ? JSON.stringify(passData) : '',
                  headers: {
                     'Content-Type': 'application/json',
                     'Authorization': token ? `Bearer ${token}` : ''
                  },
                  signal: controller.signal
               }
            );

            console.log(res);

            if (!res.ok) {
               throw new Error(res.statusText);
            }

            const resData = await res.json();
            setIsPending(false);
            setData(resData);
            setError(null);
         } catch (err) {
            if (err.name === "AbortError") {
               console.log("the fetch was aborted");
            } else {
               setIsPending(false);
               setError(err.message);
            }
         };
      };

      fetchData();

      return () => {
         controller.abort();
      };
   }, [url, method, token, passData]);

   return {
      data,
      isPending,
      error
   };
};
