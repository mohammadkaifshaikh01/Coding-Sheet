import axios from "axios";
import React, { useEffect, useState } from "react";

const Fetch = () => {
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        setData(response.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
   return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
       <div className="flex flex-col items-center">
         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
         <p className="mt-4 text-gray-600 text-lg font-semibold">Loading products...</p>
       </div>
     </div>
   );
 }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-700">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((elem) => (
          <div key={elem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img
              src={elem.image}
              alt={elem.title}
              className="w-full h-48 object-contain p-4 bg-gray-50"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{elem.title}</h3>
              <p className="text-blue-600 font-bold text-lg mb-2">${elem.price}</p>
              <p className="text-sm text-yellow-500 mb-1">Rating: ⭐ {elem.rating.rate}</p>
              <p className="text-gray-500 text-sm">{elem.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetch;
