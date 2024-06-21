import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { message } from "antd";
import {
  createDoctor,
  deleteDoctor,
  getDoctor,
  updateDoctor,
} from "../apiService";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";

const GetDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  console.log("🚀 ~ GetDoctor ~ selectedDoctor:", selectedDoctor);
  const [currentPage, setCurrentPage] = useState(1);
  const DoctorsPerPage = 10;

  const showDrawer = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const showDetail = (doctor) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedDoctor(doctor);
  };

  const onClose = () => {
    setSelectedDoctor(null);
    setOpen(false);
    setSelectedDoctor(null);
  };

  const fetchDoctors = async () => {
    try {
      const response = await getDoctor();
      const data = response.data.data;
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      message.error("Failed to fetch doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onFinish = async (values) => {
    const doctorData = {
      D_NAME: values.name,
      D_SPECIALIST: values.speciality,
      D_EMAIL: values.email,
      D_PHONE: parseInt(values.contact),
    };

    try {
      await updateDoctor(selectedDoctor.D_ID, doctorData);
      message.success("Doctor updated successfully");
      fetchDoctors();
      onClose();
    } catch (error) {
      console.error("Error updating doctor:", error);
      message.error("Failed to update doctor");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoctor(id);
      fetchDoctors();
      message.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      message.error("Failed to delete doctor");
    }
  };

  const indexOfLastDoctor = currentPage * DoctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - DoctorsPerPage;
  const currentDoctors = Array.isArray(doctors)
    ? doctors.slice(indexOfFirstDoctor, indexOfLastDoctor)
    : [];

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
            Total Doctors: {doctors?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Doctors Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>No.</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentDoctors.map((doctor, index) => (
                <tr key={doctor.D_ID}>
                  <td>{index + 1}</td>
                  <td>{doctor.D_NAME}</td>
                  <td>{doctor.D_SPECIALIST}</td>
                  <td>{doctor.D_EMAIL}</td>
                  <td>{doctor.D_PHONE}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(doctor)}
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
                            <span className="font-semibold text-xl">Name:</span>{" "}
                            {selectedDoctor?.D_NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Specialist:
                            </span>{" "}
                            {selectedDoctor?.D_SPECIALIST}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Email:
                            </span>{" "}
                            {selectedDoctor?.D_EMAIL}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Phone:
                            </span>{" "}
                            {selectedDoctor?.D_PHONE}
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
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to="/"
                        className="text-[#1d9cb5] font-semibold"
                      ></Link>
                      <>
                        <button
                          className="btn btn-warning text-white"
                          onClick={() => showDrawer(doctor)}
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
                              name: selectedDoctor?.D_NAME,
                              speciality: selectedDoctor?.D_SPECIALIST,
                              email: selectedDoctor?.D_EMAIL,
                              contact: selectedDoctor?.D_PHONE,
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
                                <Form.Item name="speciality" label="Speciality">
                                  <Input placeholder="Please enter user speciality" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="email" label="Email">
                                  <Input placeholder="Please enter Email" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="contact" label="Contact">
                                  <Input placeholder="Please enter user contact" />
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
                      <button
                        className="btn btn-error text-white"
                        onClick={() => handleDeleteDoctor(doctor?.D_ID)}
                      >
                        <MdOutlineDeleteForever size="1.4em" />
                        Delete
                      </button>
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
            { length: Math.ceil(doctors.length / DoctorsPerPage) },
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
              currentPage === Math.ceil(doctors.length / DoctorsPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetDoctor;
