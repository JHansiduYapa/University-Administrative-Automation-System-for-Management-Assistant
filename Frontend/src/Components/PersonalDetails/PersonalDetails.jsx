import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, DatePicker, notification } from 'antd';
import axios from 'axios';
import './PersonalDetails.css';
import UserInfo from "../UserInfo/UserInfo";

const api = "http://localhost:9080/api/";

const PersonalDetails = () => {
  const [form] = Form.useForm();
  const [batches, setBatches] = useState([]);

  // Fetch batches from backend on mount
  useEffect(() => {
    axios.get(api + "students")
      .then(response => {
        // Assuming response.data is an array of batch objects with keys batchId and batchName
        setBatches(response.data);
      })
      .catch(error => {
        console.error('Error fetching batches:', error);
      });
  }, []);

  const onFinish = (values) => {
    // Map the form values to the JSON body expected by the backend.
    const payload = {
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
      gender: values.gender,
      email: values.email,
      registrationDate: values.registrationDate.format('YYYY-MM-DD'),
      departmentId: values.departmentId,
      address: values.address,
      batchId: values.batchId // selected batch id from dropdown
    };

    axios.post(api + "students/register", payload)
      .then(response => {
        console.log('Student registered successfully:', response.data);
        // Show a success notification
        notification.success({
          message: 'Registration Successful',
          description: 'Student registered successfully.'
        });
        // Clear all fields after successful registration
        form.resetFields();
      })
      .catch(error => {
        console.error('Error registering student:', error);
        // Optionally display an error notification
        notification.error({
          message: 'Registration Failed',
          description: 'There was an error registering the student. Please try again.'
        });
      });
  };

  // Custom submit button that only enables submission when the form is valid
  const SubmitButton = ({ children }) => {
    const [submittable, setSubmittable] = useState(false);
    const values = Form.useWatch([], form);

    useEffect(() => {
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

          {/* Batch selection dropdown */}
          <Form.Item
            name="batchId"
            label="Batch"
            rules={[{ required: true, message: 'Please select your batch!' }]}
          >
            <Select placeholder="Select your batch">
              {batches.map(batch => (
                <Select.Option key={batch.batchId} value={batch.batchId}>
                  {batch.batchName}
                </Select.Option>
              ))}
            </Select>
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
