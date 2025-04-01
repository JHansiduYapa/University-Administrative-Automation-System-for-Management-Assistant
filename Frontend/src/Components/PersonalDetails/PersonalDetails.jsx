import React from 'react';
import { Form, Input, Button, Space, Select, DatePicker, InputNumber } from 'antd';
import axios from 'axios';
import './PersonalDetails.css';
import UserInfo from "../UserInfo/UserInfo";

const api = "http://localhost:9080/api/";

const PersonalDetails = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Map the form values to the JSON body expected by the backend.
    const payload = {
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      semesterId: values.semesterId,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
      gender: values.gender,
      email: values.email,
      gpa: parseFloat(values.gpa),
      registrationDate: values.registrationDate.format('YYYY-MM-DD'),
      departmentId: values.departmentId,
      address: values.address,
      batchId: values.batchId,
      academicBatchId: values.academicBatchId,
    };

    axios.post(api + "students/register", payload)
      .then(response => {
        console.log('Student registered successfully:', response.data);
        // You can add further actions on success (e.g., redirect or a success message)
      })
      .catch(error => {
        console.error('Error registering student:', error);
        // Handle error appropriately here (e.g., display an error message)
      });
  };

  // Custom submit button that only enables submission when the form is valid
  const SubmitButton = ({ children }) => {
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
      <UserInfo username="John Doe" profilePicture="https://via.placeholder.com/40" />
      <div className="personal-details-container">
        <h1 className="form-title">New Student - Create Account</h1>
        <Form
          form={form}
          name="personalDetails"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your first name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="middleName"
            label="Middle Name"
            rules={[{ required: true, message: 'Please enter your middle name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="semesterId"
            label="Semester"
            rules={[{ required: true, message: 'Please enter the semester!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select placeholder="Select your gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="University Email Address"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gpa"
            label="GPA"
            rules={[{ required: true, message: 'Please enter your GPA!' }]}
          >
            <InputNumber min={0} max={4} step={0.1} />
          </Form.Item>

          <Form.Item
            name="registrationDate"
            label="Registration Date"
            rules={[{ required: true, message: 'Please select your registration date!' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="departmentId"
            label="Department"
            rules={[{ required: true, message: 'Please choose your department!' }]}
          >
            <Select placeholder="Select your department">
              <Select.Option value={1}>Computer</Select.Option>
              <Select.Option value={2}>Electrical and Electronic</Select.Option>
              <Select.Option value={3}>Civil</Select.Option>
              <Select.Option value={4}>Mechanical</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="address"
            label="Permanent Address"
            rules={[{ required: true, message: 'Please enter your permanent address!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="batchId"
            label="Batch ID"
            rules={[{ required: true, message: 'Please enter your batch id!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="academicBatchId"
            label="Academic Batch ID"
            rules={[{ required: true, message: 'Please enter your academic batch id!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item>
            <Space>
              <SubmitButton>Submit</SubmitButton>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default PersonalDetails;
