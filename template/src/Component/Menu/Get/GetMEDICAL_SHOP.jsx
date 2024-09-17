import { useEffect, useState } from "react";
import { message } from "antd";
import { createMedicalShop, getTableData, updateData } from "../apiService";
import { GrEdit } from "react-icons/gr";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const GetMEDICAL_SHOP = () => {
  const [medicalShops, setMedicalShops] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMedicalShop, setSelectedMedicalShop] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const MedicalShopsPerPage = 10;

  const showDrawer = (medicalShop) => {
    setSelectedMedicalShop(medicalShop);
    setOpen(true);
  };

  const showDetail = (medicalShop) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedMedicalShop(medicalShop);
  };

  const onClose = () => {
    setSelectedMedicalShop(null);
    setOpen(false);
  };

  const fetchMedicalShops = async () => {
    try {
      const response = await getTableData("MEDICAL_SHOP");
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

  const onFinish = async (values) => {
    const medicalShopData = {
      SHOP_NAME: values.name,
      SHOP_ADDRESS: values.address,
    };

    try {
      if (selectedMedicalShop) {
        await updateData(
          "MEDICAL_SHOP",
          selectedMedicalShop.SHOP_BATCH,
          medicalShopData
        );
        message.success("Medical shop updated successfully");
      } else {
        // Assuming createMedicalShop function exists in your apiService
        await createMedicalShop(medicalShopData);
        message.success("Medical shop created successfully");
      }
      fetchMedicalShops();
      onClose();
    } catch (error) {
      console.error("Error updating medical shop:", error);
      message.error("Failed to update medical shop");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        <div className="flex justify-center text-center p-4 rounded-md mb-7 border-2 border-black shadow-xl">
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
      <div className="hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Medical Shops Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>Batch</th>
                <th>Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentMedicalShops.map((medicalShop, index) => (
                <tr key={medicalShop.SHOP_BATCH}>
                  <td>{index + 1}</td>
                  <td>{medicalShop.SHOP_BATCH}</td>
                  <td>{medicalShop.SHOP_NAME}</td>
                  <td>{medicalShop.SHOP_ADDRESS}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <>
                      <button
                          className="btn btn-warning text-white"
                          onClick={() => showDrawer(medicalShop)}
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
                              name: selectedMedicalShop?.SHOP_NAME,
                              address: selectedMedicalShop?.SHOP_ADDRESS,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="name" label="Name">
                                  <Input placeholder="Please enter name" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="address" label="Address">
                                  <Input placeholder="Please enter address" />
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
              currentPage ===
              Math.ceil(medicalShops.length / MedicalShopsPerPage)
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
