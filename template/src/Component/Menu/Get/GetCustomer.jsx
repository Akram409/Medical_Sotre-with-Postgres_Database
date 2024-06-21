import { useEffect, useState } from "react";
import { message } from "antd";
import { getCustomer } from "../apiService";

const GetCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const CustomersPerPage = 10;

  // Function to fetch data
  const fetchCustomers = async () => {
    try {
      const response = await getCustomer();
      const data = response.data.data;
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      message.error("Failed to fetch customers");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Logic for pagination
  const indexOfLastCustomer = currentPage * CustomersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - CustomersPerPage;
  const currentCustomers = Array.isArray(customers)
    ? customers.slice(indexOfFirstCustomer, indexOfLastCustomer)
    : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex justify-center text-center  p-4 rounded-md mb-7 border-2 border-black shadow-xl">
          <div className="">
            <h4 className="text-2xl font-semibold">Hello Sir,</h4>
            <p>{"Here's what's going on"}</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 rounded-md mb-7 border-2 border-black shadow-xl">
          <h4 className="text-2xl font-semibold">
            Total Customers: {customers?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Customers Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>No.</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Total Serve</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentCustomers.map((customer, index) => (
                <tr key={customer.C_ID}>
                  <td>{index + 1}</td>
                  <td>{customer.C_NAME}</td>
                  <td>{customer.C_AGE}</td>
                  <td>{customer.C_ADDRESS}</td>
                  <td>{customer.C_CONTACT}</td>
                  <td>{customer.C_SERVE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* for pagination */}
        <div className=" flex flex-wrap justify-center mb-10 mt-5">
          <button
            className="join-item btn btn-outline mr-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &larr; Previous page
          </button>
          {Array.from(
            { length: Math.ceil(customers.length / CustomersPerPage) },
            (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`join-item btn btn-outline mr-2 ${
                  currentPage === i + 1 ? "bg-green-400 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            className="join-item btn btn-outline mr-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(customers.length / CustomersPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetCustomer;
