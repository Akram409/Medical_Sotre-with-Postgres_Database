import { useEffect, useState } from "react";
import { message } from "antd";
import { getMedicalShop } from "../apiService";

const GetMEDICAL_SHOP = () => {
  const [medicalShops, setMedicalShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const MedicalShopsPerPage = 10;

  // Function to fetch data
  const fetchMedicalShops = async () => {
    try {
      const response = await getMedicalShop();
      const data = response.data.data;
      setMedicalShops(data);
    } catch (error) {
      console.error("Error fetching medical shops:", error);
      message.error("Failed to fetch medical shops");
    }
  };

  useEffect(() => {
    fetchMedicalShops();
  }, []);

  // Logic for pagination
  const indexOfLastMedicalShop = currentPage * MedicalShopsPerPage;
  const indexOfFirstMedicalShop = indexOfLastMedicalShop - MedicalShopsPerPage;
  const currentMedicalShops = Array.isArray(medicalShops)
    ? medicalShops.slice(indexOfFirstMedicalShop, indexOfLastMedicalShop)
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
            Total Medical Shops: {medicalShops?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Medical Shops Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>No.</th>
                <th>Batch</th>
                <th>Name</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentMedicalShops.map((medicalShop, index) => (
                <tr key={medicalShop.SHOP_BATCH}>
                  <td>{index + 1}</td>
                  <td>{medicalShop.SHOP_BATCH}</td>
                  <td>{medicalShop.SHOP_NAME}</td>
                  <td>{medicalShop.SHOP_ADDRESS}</td>
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
            { length: Math.ceil(medicalShops.length / MedicalShopsPerPage) },
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
              currentPage === Math.ceil(medicalShops.length / MedicalShopsPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetMEDICAL_SHOP;
