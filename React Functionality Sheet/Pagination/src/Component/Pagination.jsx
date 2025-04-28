import React, { useEffect, useState } from "react";
import axios from "axios";

const Pagination = () => {
  const [userData, setuserData] = useState([]); // useState For Storing Data
  const [currentPage, setCurrentPage] = useState(1); // set current page initial 1 for paginationo  

  const itemPerPage = 10;

  const lastIndexOfItem = currentPage * itemPerPage;
  const firstIndexOfItem = lastIndexOfItem - itemPerPage;
  const currentItem = userData.slice(firstIndexOfItem, lastIndexOfItem);
  const totalPages = Math.ceil(userData.length / itemPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("./data.json");
        setuserData(response.data);
      } catch (error) {
        console.log("Something Went Wrong From Server Side", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-700">
          Employee Pagination
        </h1>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 bg-white rounded-lg">
          <thead className="text-xs text-white uppercase bg-blue-600">
            <tr>
              <th className="px-6 py-4">Employee ID</th>
              <th className="px-6 py-4">First Name</th>
              <th className="px-6 py-4">Last Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Position</th>
              <th className="px-6 py-4">Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            {currentItem.map((elem, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition-colors`}
              >
                <td className="px-6 py-4 border-b">{(currentPage-1)* itemPerPage + index+1}</td>
                <td className="px-6 py-4 border-b">{elem.first_name}</td>
                <td className="px-6 py-4 border-b">{elem.last_name}</td>
                <td className="px-6 py-4 border-b">{elem.email}</td>
                <td className="px-6 py-4 border-b">{elem.position}</td>
                <td className="px-6 py-4 border-b">{elem.dob}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr>
              <td
                colSpan="6"
                className="text-center px-6 py-4 text-sm font-medium text-gray-500"
              >
                Total Employees: {userData.length}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="flex items-center justify-center space-x-4 mt-6">
  <button
    onClick={() => setCurrentPage((prev) => prev - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
  >
    Prev
  </button>

  <span className="text-gray-700 font-semibold">
    {currentPage} of {totalPages}
  </span>

  <button
    onClick={() => setCurrentPage((prev) => prev + 1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
  >
    Next
  </button>
</div>

    </div>
  );
};

export default Pagination;
