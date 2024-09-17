import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { selectQuery } from "../apiService";
const { Option } = Select;

const SELECT = () => {
  const [table1, setTable1] = useState("DOCTOR");
  const [table2, setTable2] = useState("CUSTOMER");
  const [selectedColumns1, setSelectedColumns1] = useState([]);
  const [selectedColumns2, setSelectedColumns2] = useState([]);

  const onFinish = async (values) => {
    const {
      table1,
      coloum1,
      table2,
      coloum2,
      where,
      groupby,
      having,
      orderby,
    } = values;
    const options = {
      columns: [
        ...selectedColumns1.map((col) => `"${table1}"."${col}"`)
        // ...selectedColumns2.map((col) => `"${table2}"."${col}"`),
      ],
      where: where ? `"${table1}".${where}` : undefined,
      groupBy: groupby ? `"${table1}".${groupby}` : undefined,
      having: having ? having : undefined,
      orderBy: orderby ? `"${table1}".${orderby}` : undefined,
    };
    console.log("🚀 ~ onFinish ~ options:", options);

    try {
      const result = await selectQuery(table1, options);
      message.success("See In Console For Result!")
      console.log("SELECT Query result:", result);
    } catch (error) {
      console.error("Error performing SELECT query:", error);
    }
  };

  const columnNames = {
    DOCTOR: ["D_ID", "D_NAME", "D_PHONE", "D_EMAIL", "D_SPECIALIST", "D_PHOTO"],
    CUSTOMER: [
      "C_ID",
      "C_NAME",
      "C_AGE",
      "C_ADDRESS",
      "C_CONTACT",
      "C_SERVE",
      "D_ID",
      "C_PHOTO",
    ],
    MEDICAL_SHOP: ["SHOP_BATCH", "SHOP_NAME", "SHOP_ADDRESS"],
    EMPLOYEES: [
      "E_ID",
      "E_NAME",
      "E_AGE",
      "E_BLOOD",
      "E_SALARY",
      "E_PHONE",
      "E_DESIGNATION",
    ],
    INVENTORY: [
      "M_ID",
      "M_NAME",
      "M_TYPE",
      "M_PRICE",
      "M_IMPORT_DATE",
      "M_EXPIRE_DATE",
      "M_REMAIN",
    ],
    COMPANIES: [
      "BATCH",
      "NAME",
      "ESTABLISHED",
      "GROWTH",
      "TOTAL_GENERICS",
      "HEADQUARTER",
      "EMAIL",
    ],
    PAYMENT_HISTORY: [
      "M_ID",
      "M_NAME",
      "C_ID",
      "D_ID",
      "TAKEN_DATE",
      "M_QUANTITY",
      "SERVED_BY",
    ],
    SUPPLIER: ["S_ID", "S_NAME", "S_AGE", "S_ADDRESS", "S_PHONE"],
    SUPPLY_HISTORY: [
      "SUPPLIED_BY",
      "SUPPLID_DATE",
      "TOTAL_AMMOUNT",
      "SUPPLY_COUNT",
    ],
  };

  const handleTable1Change = (value) => {
    setTable1(value);
    setSelectedColumns1([]); // Reset selected columns for table 1
  };

  const handleTable2Change = (value) => {
    setTable2(value);
    setSelectedColumns2([]); // Reset selected columns for table 2
  };

  const handleColumn1Select = (value) => {
    setSelectedColumns1((prevSelectedColumns1) => {
      const newSelectedColumns1 = [
        ...new Set([...prevSelectedColumns1, ...value]),
      ];
      return newSelectedColumns1;
    });
  };

  const handleColumn2Select = (value) => {
    setSelectedColumns2((prevSelectedColumns2) => {
      const newSelectedColumns2 = [
        ...new Set([...prevSelectedColumns2, ...value]),
      ];
      return newSelectedColumns2;
    });
  };

  return (
    <>
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
              Query Type:{" "}
              <span className="text-blue-500 font-bold text-3xl">"SELECT"</span>
            </h4>
          </div>
        </div>
        <div className=" hidden lg:block p-4 rounded-md border-2 border-black shadow-xl">
          <div className="w-full">
            <h4 className="text-3xl text-center font-semibold mb-5 text-blue-500">
              Query Condition
            </h4>
            <Form
              className="w-full"
              onFinish={onFinish}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 1300,
              }}
            >
              <Row gutter={16}>
                <Col className="gutter-row" span={9}>
                  <Form.Item label="Table 1" name="table1">
                    <Select onChange={handleTable1Change} value={table1}>
                      <Option value="DOCTOR">DOCTOR</Option>
                      <Option value="CUSTOMER">CUSTOMER</Option>
                      <Option value="MEDICAL_SHOP">MEDICAL SHOP</Option>
                      <Option value="EMPLOYEES">EMPLOYEES</Option>
                      <Option value="INVENTORY">INVENTORY</Option>
                      <Option value="COMPANIES">COMPANIES</Option>
                      <Option value="PAYMENT_HISTORY">PAYMENT HISTORY</Option>
                      <Option value="SUPPLIER">SUPPLIER</Option>
                      <Option value="SUPPLY_HISTORY">SUPPLY_HISTORY</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={9}>
                  <Form.Item label="Coloum 1" name="coloum1">
                    <Select
                      mode="multiple"
                      onChange={handleColumn1Select}
                      value={selectedColumns1}
                      placeholder="Please select"
                    >
                      {columnNames[table1].map((column) => (
                        <Option key={column} value={column}>
                          {column}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col className="gutter-row" span={6}>
                  <Form.Item label="Table 2" name="table2">
                    <Select onChange={handleTable2Change} value={table2}>
                      <Option value="DOCTOR">DOCTOR</Option>
                      <Option value="CUSTOMER">CUSTOMER</Option>
                      <Option value="MEDICAL_SHOP">MEDICAL SHOP</Option>
                      <Option value="EMPLOYEES">EMPLOYEES</Option>
                      <Option value="INVENTORY">INVENTORY</Option>
                      <Option value="COMPANIES">COMPANIES</Option>
                      <Option value="PAYMENT_HISTORY">PAYMENT HISTORY</Option>
                      <Option value="SUPPLIER">SUPPLIER</Option>
                      <Option value="SUPPLY_HISTORY">SUPPLY_HISTORY</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="Coloum 2" name="coloum2">
                    <Select
                      mode="multiple"
                      onChange={handleColumn2Select}
                      value={selectedColumns2}
                      placeholder="Please select"
                    >
                      {columnNames[table2].map((column) => (
                        <Option key={column} value={column}>
                          {column}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col> */}
              </Row>
              <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="WHERE" name="where">
                    <Input placeholder="Write Condition here" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="GROUP BY" name="groupby">
                    <Input placeholder="Write Condition here" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="HAVING" name="having">
                    <Input placeholder="Write Condition here" />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={6}>
                  <Form.Item label="ORDER BY" name="orderby">
                    <Input placeholder="Write Condition here" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={12} offset={6}>
                  <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SELECT;
