import { useEffect, useState } from "react";
import { message } from "antd";
import {
  createEmployees,
  getTableData,
  updateData,
} from "../apiService";
import { GrEdit } from "react-icons/gr";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const GetEmployee = () => {
  const [employees, setEmployees] = useState([]);
  console.log("🚀 ~ GetEmployee ~ employees:", employees)
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const EmployeesPerPage = 10;

  const showDrawer = (employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const showDetail = (employee) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedEmployee(employee);
  };

  const onClose = () => {
    setSelectedEmployee(null);
    setOpen(false);
  };

  const fetchEmployees = async () => {
    try {
      const response = await getTableData("EMPLOYEES"); 
      const data = response.data.data;
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      message.error("Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  const onFinish = async (values) => {
    const employeeData = {
      E_NAME: values.name,
      E_AGE: values.age,
      E_BLOOD: values.blood,
      E_SALARY: values.salary,
      E_PHONE: values.phone,
      E_DESIGNATION: values.designation,
    };

    try {
      if (selectedEmployee) {
        await updateData("EMPLOYEES", selectedEmployee.E_ID, employeeData);  
        message.success("Employee updated successfully");
      } else {
        await createEmployees(employeeData); 
        message.success("Employee created successfully");
      }
      fetchEmployees();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
      message.error("Failed to update employee");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // Logic for pagination
  const indexOfLastEmployee = currentPage * EmployeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - EmployeesPerPage;
  const currentEmployees = Array.isArray(employees)
    ? employees.slice(indexOfFirstEmployee, indexOfLastEmployee)
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
          Total Employees: {employees?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Employees Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Salary</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentEmployees.map((employee, index) => (
                <tr key={employee.E_ID}>
                  <td>{index + 1}</td>
                  <td>{employee.E_ID}</td>
                  <td>{employee.E_NAME}</td>
                  <td>{employee.E_AGE}</td>
                  <td>{employee.E_BLOOD}</td>
                  <td>{employee.E_SALARY}</td>
                  <td>{employee.E_PHONE}</td>
                  <td>{employee.E_DESIGNATION}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(employee)}
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
                            {selectedEmployee?.E_ID}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Name:
                            </span>{" "}
                            {selectedEmployee?.E_NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Age:
                            </span>{" "}
                            {selectedEmployee?.E_AGE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Blood Group:
                            </span>{" "}
                            {selectedEmployee?.E_BLOOD}
                          </h1>
                        </div>
                        <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                            Salary:
                            </span>{" "}
                            {selectedEmployee?.E_SALARY}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Phone:
                            </span>{" "}
                            {selectedEmployee?.E_PHONE}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Designation:
                            </span>{" "}
                            {selectedEmployee?.E_DESIGNATION}
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
                          onClick={() => showDrawer(employee)}
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
                              name: selectedEmployee?.E_NAME,
                              age: selectedEmployee?.E_AGE,
                              blood: selectedEmployee?.E_BLOOD,
                              salary: selectedEmployee?.E_SALARY,
                              phone: selectedEmployee?.E_PHONE,
                              designation: selectedEmployee?.E_DESIGNATION,
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
                                <Form.Item name="blood" label="Blood Group">
                                  <Input placeholder="Please enter blood group" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="salary" label="Salary">
                                  <Input placeholder="Please enter user Salary" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="phone" label="Phone">
                                  <Input placeholder="Please enter Phone" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="designation" label="Designation">
                                  <Input placeholder="Please enter Designation" />
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
            { length: Math.ceil(employees.length / EmployeesPerPage) },
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
              currentPage === Math.ceil(employees.length / EmployeesPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetEmployee;
