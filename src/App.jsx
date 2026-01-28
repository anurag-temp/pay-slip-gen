import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Card, Row, Col, Typography, Space } from 'antd';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import dayjs from 'dayjs';
import PayslipPDF from './PaySlip'; // Use the template from the previous step

const { Title } = Typography;

const App = () => {
  const [form] = Form.useForm();

  // Default values for the initial render
  const [values, setValues] = useState({
    companyName: 'TechSolutions Pvt Ltd',
    companyAddress: '123 Business Park, Bangalore, KA - 560001',
    month: dayjs().format('MMMM YYYY'),
    employeeName: 'John Doe',
    employeeId: 'EMP-001',
    designation: 'Software Engineer',
    bankAccount: 'XXXX XXXX 1234',
    pan: 'ABCDE1234F',
    basic: 50000,
    hra: 20000,
    tax: 5000,
    pf: 1800,
  });

  const onValuesChange = (_, allValues) => {
    setValues({
      ...allValues,
      month: allValues.month ? allValues.month.format('MMMM YYYY') : '',
    });
  };

  return (
    <div style={{ padding: '20px', background: '#f0f2f5', minHeight: '90vh', width: '96vw' }}>
      <Row gutter={24} style={{ height: "100%" }}>
        {/* LEFT SIDE: Input Form */}
        <Col span={10}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Payslip Details</Title>}
            bordered={false}
            style={{ height: 'calc(100vh - 40px)', overflowY: 'auto' }}
          >
            <Form
              form={form}
              layout="vertical"
              initialValues={{ ...values, month: dayjs() }}
              onValuesChange={onValuesChange}
            >
              <Space direction="vertical" style={{ width: '100%' }} size="large">

                <section>
                  <Title level={5} type="secondary">Company Info</Title>
                  <Form.Item label="Company Name" name="companyName"><Input /></Form.Item>
                  <Form.Item label="Address" name="companyAddress"><Input.TextArea rows={2} /></Form.Item>
                  <Form.Item label="Pay Month" name="month"><DatePicker picker="month" style={{ width: '100%' }} /></Form.Item>
                </section>

                <section>
                  <Title level={5} type="secondary">Employee Info</Title>
                  <Form.Item label="Name" name="employeeName"><Input /></Form.Item>
                  <Row gutter={8}>
                    <Col span={12}><Form.Item label="ID" name="employeeId"><Input /></Form.Item></Col>
                    <Col span={12}><Form.Item label="Designation" name="designation"><Input /></Form.Item></Col>
                  </Row>
                </section>

                <section>
                  <Title level={5} type="secondary">Financials (INR)</Title>
                  <Row gutter={8}>
                    <Col span={12}><Form.Item label="Basic" name="basic"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
                    <Col span={12}><Form.Item label="HRA" name="hra"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
                  </Row>
                  <Row gutter={8}>
                    <Col span={12}><Form.Item label="TDS" name="tax"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
                    <Col span={12}><Form.Item label="PF" name="pf"><InputNumber style={{ width: '100%' }} /></Form.Item></Col>
                  </Row>
                </section>

                <div style={{ textAlign: 'center', marginTop: 20 }}>
                  <PDFDownloadLink
                    document={<PayslipPDF data={values} />}
                    fileName={`Payslip_${values.employeeName}.pdf`}
                    style={{
                      backgroundColor: '#1890ff',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '4px',
                      textDecoration: 'none'
                    }}
                  >
                    {({ loading }) => (loading ? 'Preparing...' : 'Download Final PDF')}
                  </PDFDownloadLink>
                </div>

              </Space>
            </Form>
          </Card>
        </Col>

        {/* RIGHT SIDE: PDF Preview */}
        <Col span={14}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Live Preview</Title>}
            bordered={false}
            style={{ height: 'calc(100vh - 40px)' }}
            bodyStyle={{ padding: 0, height: 'calc(100% - 58px)' }}
          >
            <PDFViewer width="100%" height="100%" showToolbar={false} style={{ border: 'none' }}>
              <PayslipPDF data={values} />
            </PDFViewer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default App;