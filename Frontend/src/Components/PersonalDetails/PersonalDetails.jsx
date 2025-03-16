import React from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import './PersonalDetails.css';
import UserInfo from "../UserInfo/UserInfo";

const PersonalDetails = () => {
  const [form] = Form.useForm();

  const SubmitButton = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState(false);
    const values = Form.useWatch([], form);

    React.useEffect(() => {
      form
        .validateFields({ validateOnly: true })
        .then(() => setSubmittable(true))
        .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
      <Button type="primary" htmlType="submit" disabled={!submittable}>
        {children}
      </Button>
    );
  };

  return (
    <>
    {/* Include User Info */}
    <UserInfo username="John Doe" profilePicture="https://via.placeholder.com/40" />
    {/*Untill here.........also import as above*/}
    
    <div className="personal-details-container">
      <h1 className="form-title">New Student - Create Account</h1>
      <Form form={form} name="personalDetails" layout="vertical" autoComplete="off">
        <Form.Item
          name="nameWithInitials"
          label="Name with Initials"
          rules={[{ required: true, message: 'Please enter your name with initials!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter your full name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="regNo"
          label="University Registration Number"
          rules={[{ required: true, type: 'regNo', message: 'Please enter a valid registration number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="University Email Address"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department (If have)"
          rules={[{ required: true, message: 'Please choose your department!' }]}
        >
          <Select placeholder="Select your department">
            <Select.Option value="Computer">Computer</Select.Option>
            <Select.Option value="Electrical and Electronic">Electrical and Electronic</Select.Option>
            <Select.Option value="Civil">Civil</Select.Option>
            <Select.Option value="Mechanical">Mechanical</Select.Option>
            <Select.Option value="None">None</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="semester"
          label="Semester"
          rules={[{ required: true, type: 'semester', message: 'Please enter the semester!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: false, message: 'Please enter your date of birth!' }]}
        >
          <Input type="date" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Permanent Address"
          rules={[{ required: false, message: 'Please enter your permanent address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="telephone"
          label="Telephone Number"
          rules={[{ required: false, message: 'Please enter your telephone number!' }]}
        >
          <Input />
        </Form.Item>
      
        <Form.Item>
          <Space>
            <SubmitButton form={form}>Submit</SubmitButton>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
    </>
  );
};

export default PersonalDetails;
