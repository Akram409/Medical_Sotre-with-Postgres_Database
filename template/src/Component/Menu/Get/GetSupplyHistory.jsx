import React, { useEffect, useState } from "react";
import { message, Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";
import { getTableData, updateData } from "../apiService";

const GetSupplyHistory = () => {
  const [supplyHistory, setSupplyHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 10;

  const showDrawer = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const onClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };

  const fetchSupplyHistory = async () => {
    try {
      const response = await getTableData("SUPPLY_HISTORY");
      const data = response.data.data;
      setSupplyHistory(data);
    } catch (error) {
      console.error("Error fetching supply history:", error);
      message.error("Failed to fetch supply history");
    }
  };

  useEffect(() => {
    fetchSupplyHistory();
  }, []);



  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = Array.isArray(supplyHistory)
    ? supplyHistory.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex justify-center text-center p-4 rounded-md mb-7 border-2 border-black shadow-xl">
          <div>
            <h4 className="text-2xl font-semibold">Supply History Panel</h4>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 rounded-md mb-7 border-2 border-black shadow-xl">
          <h4 className="text-2xl font-semibold">
            Total Items: {supplyHistory?.length}
          </h4>
        </div>
      </div>
      <div className="hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Items List</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>Supplied By</th>
                <th>Supplied Date</th>
                <th>Total Amount</th>
                <th>Supply Count</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((item, index) => (
                <tr key={item.SUPPLIED_BY}>
                  <td>{index + 1}</td>
                  <td>{item.SUPPLIED_BY}</td>
                  <td>{item.SUPPLID_DATE}</td>
                  <td>{item.TOTAL_AMMOUNT}</td>
                  <td>{item.SUPPLY_COUNT}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap justify-center mb-10 mt-5">
          <button
            className="join-item btn btn-outline mr-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &larr; Previous Page
          </button>
          {Array.from(
            { length: Math.ceil(supplyHistory.length / ItemsPerPage) },
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
              currentPage === Math.ceil(supplyHistory.length / ItemsPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetSupplyHistory;
