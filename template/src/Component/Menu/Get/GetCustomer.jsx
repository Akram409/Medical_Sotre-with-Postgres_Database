import { useEffect, useState } from "react";
import { message } from "antd";
import {
  createCustomer,
  getTableData,
  updateData,
} from "../apiService";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const GetCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const CustomersPerPage = 10;

  const showDrawer = (customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const showDetail = (customer) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedCustomer(customer);
  };

  const onClose = () => {
    setSelectedCustomer(null);
    setOpen(false);
  };

  const fetchCustomers = async () => {
    try {
      const response = await getTableData("CUSTOMER"); 
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


  const onFinish = async (values) => {
    const customerData = {
      C_NAME: values.name,
      C_AGE: values.age,
      C_ADDRESS: values.address,
      C_CONTACT: values.contact,
    };

    try {
      if (selectedCustomer) {
        await updateData("CUSTOMER", selectedCustomer.C_ID, customerData);  
        message.success("Customer updated successfully");
      } else {
        await createCustomer(customerData); 
        message.success("Customer created successfully");
      }
      fetchCustomers();
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
      message.error("Failed to update customer");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Total Serve</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentCustomers.map((customer, index) => (
                <tr key={customer.C_ID}>
                  <td>{index + 1}</td>
                  <td>{customer.C_ID}</td>
                  <td>{customer.C_NAME}</td>
                  <td>{customer.C_AGE}</td>
                  <td>{customer.C_ADDRESS}</td>
                  <td>{customer.C_CONTACT}</td>
                  <td>{customer.C_SERVE}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(customer)}
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
                            <span className="font-semibold text-xl">
                              ID:
                            </span>{" "}
                            {selectedCustomer?.C_ID}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Name:
                            </span>{" "}
                            {selectedCustomer?.C_NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Age:
                            </span>{" "}
                            {selectedCustomer?.C_AGE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Contact:
                            </span>{" "}
                            {selectedCustomer?.C_CONTACT}
                          </h1>
                        </div>
                        <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                            Total Serve:
                            </span>{" "}
                            {selectedCustomer?.C_SERVE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Address:
                            </span>{" "}
                            {selectedCustomer?.C_ADDRESS}
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
                      <Link
                        to="/"
                        className="text-[#1d9cb5] font-semibold"
                      ></Link>
                      <>
                        <button
                          className="btn btn-warning text-white"
                          onClick={() => showDrawer(customer)}
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
                              name: selectedCustomer?.C_NAME,
                              age: selectedCustomer?.C_AGE,
                              address: selectedCustomer?.C_ADDRESS,
                              contact: selectedCustomer?.C_CONTACT,
                              serve: selectedCustomer?.C_SERVE,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="name" label="Name">
                                  <Input placeholder="Please enter user name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="age" label="Age">
                                  <Input placeholder="Please enter user age" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="address" label="Address">
                                  <Input placeholder="Please enter Email" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="contact" label="Contact">
                                  <Input placeholder="Please enter user contact" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="serve" label="serve">
                                  <Input placeholder="Please enter Email" />
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
