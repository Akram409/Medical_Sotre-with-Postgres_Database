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

const GetPaymentHistory = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const paymentsPerPage = 10;

  const showDrawer = (payment) => {
    setSelectedPayment(payment);
    setOpen(true);
  };

  const showDetail = (payment) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedPayment(payment);
  };

  const onClose = () => {
    setSelectedPayment(null);
    setOpen(false);
  };

  const fetchPaymentHistory = async () => {
    try {
      const response = await getTableData("PAYMENT_HISTORY");
      const data = response.data.data;
      setPaymentHistory(data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
      message.error("Failed to fetch payment history");
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const onFinish = async (values) => {
    const paymentData = {
      M_ID: values.mId,
      M_NAME: values.mName,
      C_ID: values.cId,
      D_ID: values.dId,
      TAKEN_DATE: values.takenDate,
      M_QUANTITY: values.mQuantity,
      SERVED_BY: values.servedBy,
    };

    try {
      if (selectedPayment) {
        await updateData("PAYMENT_HISTORY", selectedPayment.M_ID, paymentData);
        message.success("Payment updated successfully");
      } else {
        await createCustomer(paymentData); // Adjust this to the correct API call for creating payment history if needed
        message.success("Payment created successfully");
      }
      fetchPaymentHistory();
      onClose();
    } catch (error) {
      console.error("Error updating payment:", error);
      message.error("Failed to update payment");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Logic for pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = Array.isArray(paymentHistory)
    ? paymentHistory.slice(indexOfFirstPayment, indexOfLastPayment)
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
          Total Payments: {paymentHistory?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Payment History Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>Medicine ID</th>
                <th>Medicine Name</th>
                <th>Customer ID</th>
                <th>Doctor ID</th>
                <th>Taken Date</th>
                <th>Quantity</th>
                <th>Served By</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentPayments.map((payment, index) => (
                <tr key={payment.M_ID}>
                  <td>{index + 1}</td>
                  <td>{payment.M_ID}</td>
                  <td>{payment.M_NAME}</td>
                  <td>{payment.C_ID}</td>
                  <td>{payment.D_ID}</td>
                  <td>{new Date(payment.TAKEN_DATE).toLocaleDateString()}</td>
                  <td>{payment.M_QUANTITY}</td>
                  <td>{payment.SERVED_BY}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(payment)}
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
                              Medicine ID:
                            </span>{" "}
                            {selectedPayment?.M_ID}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Medicine Name:
                            </span>{" "}
                            {selectedPayment?.M_NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Customer ID:
                            </span>{" "}
                            {selectedPayment?.C_ID}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Doctor ID:
                            </span>{" "}
                            {selectedPayment?.D_ID}
                          </h1>
                        </div>
                        <h1 className="text-lg">
                          <span className="font-semibold text-xl">
                            Quantity:
                          </span>{" "}
                          {selectedPayment?.M_QUANTITY}
                        </h1>
                        <h1 className="text-lg">
                          <span className="font-semibold text-xl">
                            Taken Date:
                          </span>{" "}
                          {new Date(selectedPayment?.TAKEN_DATE).toLocaleDateString()}
                        </h1>
                        <h1 className="text-lg">
                          <span className="font-semibold text-xl">
                            Served By:
                          </span>{" "}
                          {selectedPayment?.SERVED_BY}
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
                          onClick={() => showDrawer(payment)}
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
                              mId: selectedPayment?.M_ID,
                              mName: selectedPayment?.M_NAME,
                              cId: selectedPayment?.C_ID,
                              dId: selectedPayment?.D_ID,
                              takenDate: selectedPayment?.TAKEN_DATE,
                              mQuantity: selectedPayment?.M_QUANTITY,
                              servedBy: selectedPayment?.SERVED_BY,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="mId" label="Medicine ID">
                                  <Input placeholder="Please enter medicine ID" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="mName" label="Medicine Name">
                                  <Input placeholder="Please enter medicine name" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="cId" label="Customer ID">
                                  <Input placeholder="Please enter customer ID" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="dId" label="Doctor ID">
                                  <Input placeholder="Please enter doctor ID" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="takenDate" label="Taken Date">
                                  <Input placeholder="Please enter taken date" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="mQuantity" label="Quantity">
                                  <Input placeholder="Please enter quantity" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="servedBy" label="Served By">
                                  <Input placeholder="Please enter served by" />
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
            { length: Math.ceil(paymentHistory.length / paymentsPerPage) },
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
              currentPage === Math.ceil(paymentHistory.length / paymentsPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetPaymentHistory;
