import { useEffect, useState } from "react";
import { message } from "antd";
import { createCustomer, getTableData, updateData } from "../apiService";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const GetSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 10;

  const showDrawer = (supplier) => {
    setSelectedSupplier(supplier);
    setOpen(true);
  };

  const showDetail = (supplier) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedSupplier(supplier);
  };

  const onClose = () => {
    setSelectedSupplier(null);
    setOpen(false);
  };

  const fetchSuppliers = async () => {
    try {
      const response = await getTableData("SUPPLIER");
      const data = response.data.data;
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      message.error("Failed to fetch suppliers");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const onFinish = async (values) => {
    const supplierData = {
      S_NAME: values.name,
      S_AGE: values.age,
      S_ADDRESS: values.address,
      S_PHONE: values.phone,
    };

    try {
      if (selectedSupplier) {
        await updateData("SUPPLIER", selectedSupplier.S_ID, supplierData);
        message.success("Supplier updated successfully");
      } else {
        await createCustomer(supplierData); // Adjust this to the correct API call for creating supplier if needed
        message.success("Supplier created successfully");
      }
      fetchSuppliers();
      onClose();
    } catch (error) {
      console.error("Error updating supplier:", error);
      message.error("Failed to update supplier");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Logic for pagination
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = Array.isArray(suppliers)
    ? suppliers.slice(indexOfFirstSupplier, indexOfLastSupplier)
    : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        <div className="flex justify-center text-center p-4 rounded-md mb-7 border-2 border-black shadow-xl">
          <div>
            <h4 className="text-2xl font-semibold">Hello Sir,</h4>
            <p>{"Here's what's going on"}</p>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 rounded-md mb-7 border-2 border-black shadow-xl">
          <h4 className="text-2xl font-semibold">
            Total Suppliers: {suppliers?.length}
          </h4>
        </div>
      </div>
      <div className="hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Suppliers Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentSuppliers.map((supplier, index) => (
                <tr key={supplier.S_ID}>
                  <td>{index + 1}</td>
                  <td>{supplier.S_ID}</td>
                  <td>{supplier.S_NAME}</td>
                  <td>{supplier.S_AGE}</td>
                  <td>{supplier.S_ADDRESS}</td>
                  <td>{supplier.S_PHONE}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(supplier)}
                    >
                      Details
                    </button>
                    <dialog
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle glass"
                    >
                      <div className="modal-box">
                        <div className="avatar">
                          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                          </div>
                        </div>
                        <div className="mt-3">
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">ID:</span>{" "}
                            {selectedSupplier?.S_ID}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">Name:</span>{" "}
                            {selectedSupplier?.S_NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">Age:</span>{" "}
                            {selectedSupplier?.S_AGE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">Phone:</span>{" "}
                            {selectedSupplier?.S_PHONE}
                          </h1>
                        </div>
                        <h1 className="text-lg">
                          <span className="font-semibold text-xl">Address:</span>{" "}
                          {selectedSupplier?.S_ADDRESS}
                        </h1>
                        <div className="modal-action">
                          <form method="dialog">
                            <button className="btn btn-error text-white">
                              Close
                            </button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      <Link to="/" className="text-[#1d9cb5] font-semibold"></Link>
                      <>
                        <button
                          className="btn btn-warning text-white"
                          onClick={() => showDrawer(supplier)}
                        >
                          <GrEdit />
                          Edit
                        </button>
                        <Drawer
                          title="Update here...."
                          width={720}
                          onClose={onClose}
                          open={open}
                        >
                          <Form
                            layout="vertical"
                            initialValues={{
                              name: selectedSupplier?.S_NAME,
                              age: selectedSupplier?.S_AGE,
                              address: selectedSupplier?.S_ADDRESS,
                              phone: selectedSupplier?.S_PHONE,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="name" label="Name">
                                  <Input placeholder="Please enter supplier name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="age" label="Age">
                                  <Input placeholder="Please enter supplier age" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="address" label="Address">
                                  <Input placeholder="Please enter supplier address" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="phone" label="Phone">
                                  <Input placeholder="Please enter supplier phone" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Form.Item>
                              <Space>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                              </Space>
                            </Form.Item>
                          </Form>
                        </Drawer>
                      </>
                    </div>
                  </td>
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
            &larr; Previous page
          </button>
          {Array.from(
            { length: Math.ceil(suppliers.length / suppliersPerPage) },
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
              currentPage === Math.ceil(suppliers.length / suppliersPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetSupplier;
