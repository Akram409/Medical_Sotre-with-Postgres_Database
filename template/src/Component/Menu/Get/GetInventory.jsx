import { useEffect, useState } from "react";
import { message } from "antd";
import {
  createInventory,
  getTableData,
  updateData,
} from "../apiService";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const GetInventory = () => {
  const [inventories, setInventories] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const InventoriesPerPage = 10;

  const showDrawer = (inventory) => {
    setSelectedInventory(inventory);
    setOpen(true);
  };

  const showDetail = (inventory) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedInventory(inventory);
  };

  const onClose = () => {
    setSelectedInventory(null);
    setOpen(false);
  };

  const fetchInventories = async () => {
    try {
      const response = await getTableData("INVENTORY");
      const data = response.data.data;
      setInventories(data);
    } catch (error) {
      console.error("Error fetching inventories:", error);
      message.error("Failed to fetch inventories");
    }
  };

  useEffect(() => {
    fetchInventories();
  }, []);

  const onFinish = async (values) => {
    const inventoryData = {
      M_NAME: values.name,
      M_TYPE: values.type,
      M_PRICE: values.price,
      M_IMPORT_DATE: values.importDate,
      M_EXPIRE_DATE: values.expireDate,
      M_REMAIN: values.remain,
    };

    try {
      if (selectedInventory) {
        await updateData("INVENTORY", selectedInventory.M_ID, inventoryData);
        message.success("Inventory updated successfully");
      } else {
        await createInventory(inventoryData);
        message.success("Inventory created successfully");
      }
      fetchInventories();
      onClose();
    } catch (error) {
      console.error("Error updating inventory:", error);
      message.error("Failed to update inventory");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Logic for pagination
  const indexOfLastInventory = currentPage * InventoriesPerPage;
  const indexOfFirstInventory = indexOfLastInventory - InventoriesPerPage;
  const currentInventories = Array.isArray(inventories)
    ? inventories.slice(indexOfFirstInventory, indexOfLastInventory)
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
            Total Inventories: {inventories?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Inventories Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Import Date</th>
                <th>Expire Date</th>
                <th>Remain</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentInventories.map((inventory, index) => (
                <tr key={inventory.M_ID}>
                  <td>{index + 1}</td>
                  <td>{inventory.M_ID}</td>
                  <td>{inventory.M_NAME}</td>
                  <td>{inventory.M_TYPE}</td>
                  <td>{inventory.M_PRICE}</td>
                  <td>{new Date(inventory.M_IMPORT_DATE).toLocaleDateString()}</td>
                  <td>{new Date(inventory.M_EXPIRE_DATE).toLocaleDateString()}</td>
                  <td>{inventory.M_REMAIN}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(inventory)}
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
                            {selectedInventory?.M_ID}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Name:
                            </span>{" "}
                            {selectedInventory?.M_NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Type:
                            </span>{" "}
                            {selectedInventory?.M_TYPE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Price:
                            </span>{" "}
                            {selectedInventory?.M_PRICE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Import Date:
                            </span>{" "}
                            {new Date(selectedInventory?.M_IMPORT_DATE).toLocaleDateString()}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Expire Date:
                            </span>{" "}
                            {new Date(selectedInventory?.M_EXPIRE_DATE).toLocaleDateString()}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Remain:
                            </span>{" "}
                            {selectedInventory?.M_REMAIN}
                          </h1>
                        </div>
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
                          onClick={() => showDrawer(inventory)}
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
                              name: selectedInventory?.M_NAME,
                              type: selectedInventory?.M_TYPE,
                              price: selectedInventory?.M_PRICE,
                              importDate: selectedInventory?.M_IMPORT_DATE,
                              expireDate: selectedInventory?.M_EXPIRE_DATE,
                              remain: selectedInventory?.M_REMAIN,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="name" label="Name">
                                  <Input placeholder="Please enter inventory name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="type" label="Type">
                                  <Input placeholder="Please enter inventory type" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="price" label="Price">
                                  <Input placeholder="Please enter price" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="importDate" label="Import Date">
                                  <Input placeholder="Please enter import date" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="expireDate" label="Expire Date">
                                  <Input placeholder="Please enter expire date" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="remain" label="Remain">
                                  <Input placeholder="Please enter remaining quantity" />
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
            { length: Math.ceil(inventories.length / InventoriesPerPage) },
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
              currentPage === Math.ceil(inventories.length / InventoriesPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetInventory;
