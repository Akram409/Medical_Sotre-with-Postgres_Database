import { useEffect, useState } from "react";
import { message } from "antd";
import {
    createCompanies,
  getTableData,
  updateData,
} from "../apiService";
import { GrEdit } from "react-icons/gr";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button, Col, Drawer, Form, Input, Row, Space } from "antd";
import { Link } from "react-router-dom";

const GetCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const CompaniesPerPage = 10;

  const showDrawer = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const showDetail = (company) => {
    document.getElementById("my_modal_5").showModal();
    setSelectedCompany(company);
  };

  const onClose = () => {
    setSelectedCompany(null);
    setOpen(false);
  };

  const fetchCompanies = async () => {
    try {
      const response = await getTableData("COMPANIES");
      const data = response.data.data;
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      message.error("Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const onFinish = async (values) => {
    const companyData = {
      BATCH: values.batch,
      NAME: values.name,
      ESTABLISHED: values.established,
      GROWTH: values.growth,
      TOTAL_GENERICS: values.totalGenerics,
      HEADQUARTER: values.headquarter,
      EMAIL: values.email,
    };

    try {
      if (selectedCompany) {
        await updateData("COMPANIES", selectedCompany.BATCH, companyData);
        message.success("Company updated successfully");
      } else {
        await createCompanies(companyData);
        message.success("Company created successfully");
      }
      fetchCompanies();
      onClose();
    } catch (error) {
      console.error("Error updating company:", error);
      message.error("Failed to update company");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Logic for pagination
  const indexOfLastCompany = currentPage * CompaniesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - CompaniesPerPage;
  const currentCompanies = Array.isArray(companies)
    ? companies.slice(indexOfFirstCompany, indexOfLastCompany)
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
          Total Companies: {companies?.length}
          </h4>
        </div>
      </div>
      <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
        <div className="flex justify-between">
          <h4 className="text-2xl font-semibold">Companies Panel</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="font-semibold text-base text-center">
                <th>SL</th>
                <th>BATCH</th>
                <th>Name</th>
                <th>Established</th>
                <th>Growth (%)</th>
                <th>Total Generics</th>
                <th>Headquarter</th>
                <th>Email</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentCompanies.map((company, index) => (
                <tr key={company.BATCH}>
                  <td>{index + 1}</td>
                  <td>{company.BATCH}</td>
                  <td>{company.NAME}</td>
                  <td>{new Date(company.ESTABLISHED).toLocaleDateString()}</td>
                  <td>{company.GROWTH}</td>
                  <td>{company.TOTAL_GENERICS}</td>
                  <td>{company.HEADQUARTER}</td>
                  <td>{company.EMAIL}</td>
                  <td>
                    <button
                      className="btn btn-info text-white"
                      onClick={() => showDetail(company)}
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
                              BATCH:
                            </span>{" "}
                            {selectedCompany?.BATCH}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Name:
                            </span>{" "}
                            {selectedCompany?.NAME}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Established:
                            </span>{" "}
                            {new Date(selectedCompany?.ESTABLISHED).toLocaleDateString()}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Growth:
                            </span>{" "}
                            {selectedCompany?.GROWTH}
                          </h1>
                        </div>
                        <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                            Total Generics:
                            </span>{" "}
                            {selectedCompany?.TOTAL_GENERICS}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Headquarter:
                            </span>{" "}
                            {selectedCompany?.HEADQUARTER}
                          </h1>
                          <h1 className="text-lg">
                            <span className="font-semibold text-xl">
                              Email:
                            </span>{" "}
                            {selectedCompany?.EMAIL}
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
                          onClick={() => showDrawer(company)}
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
                              batch: selectedCompany?.BATCH,
                              name: selectedCompany?.NAME,
                              established: selectedCompany?.ESTABLISHED,
                              growth: selectedCompany?.GROWTH,
                              totalGenerics: selectedCompany?.TOTAL_GENERICS,
                              headquarter: selectedCompany?.HEADQUARTER,
                              email: selectedCompany?.EMAIL,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                          >
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="batch" label="Batch">
                                  <Input placeholder="Please enter company batch" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="name" label="Name">
                                  <Input placeholder="Please enter company name" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="established" label="Established">
                                  <Input placeholder="Please enter established date" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="growth" label="Growth">
                                  <Input placeholder="Please enter growth percentage" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="totalGenerics" label="Total Generics">
                                  <Input placeholder="Please enter total generics" />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item name="headquarter" label="Headquarter">
                                  <Input placeholder="Please enter headquarter" />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={16}>
                              <Col span={12}>
                                <Form.Item name="email" label="Email">
                                  <Input placeholder="Please enter email" />
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
            { length: Math.ceil(companies.length / CompaniesPerPage) },
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
              currentPage === Math.ceil(companies.length / CompaniesPerPage)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetCompanies;
