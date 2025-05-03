import React, { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const [data, setData] = useState([]);
  const [searcher, setSearcher] = useState([]);
  const [loading , setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./data.json");
        console.log(response.data);
        setData(response.data);
        setLoading(false)
      } catch (error) {
        console.log("Something Went Wrong", error);
        setLoading(false)
      }
    };
    fetchData();
  }, []);


  if(loading){
   return(

      <h1>Product Fetching....</h1>
   )
  }

  const searchItem = (e) =>{
   const search = e.target.value
   // console.log(search);

   if(search.length === 0){
      setSearcher(data)
   }
   else{
      const response = data.filter((elem)=>elem.first_name.toLowerCase().includes(search.toLowerCase()))
   console.log(response);
   setSearcher(response)
   }
   
   
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h3 className="text-3xl font-semibold text-center text-gray-800 mb-6">Employee Details</h3>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
        
         onChange={searchItem}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="overflow-x-auto w-full max-w-5xl mx-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium">First Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Last Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date Of Birth</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searcher.map((elem, index) => (
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{elem.first_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{elem.last_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{elem.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{elem.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6 text-xl font-semibold text-gray-800">
        Total Employees: {data.length}
      </div>
    </div>
  );
};

export default Search;
