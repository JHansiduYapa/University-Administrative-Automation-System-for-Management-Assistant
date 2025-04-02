import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Space, Select, notification } from 'antd';
import axios from 'axios';
import './LectureRegistration.css';

const api = "http://localhost:9080/api/";

const LectureRegistration = () => {
  const [form] = Form.useForm();
  const [departments, setDepartments] = useState([]);

  // Fetch available departments from the backend on mount
  useEffect(() => {
    axios.get(api + "departments")
      .then(response => {
        setDepartments(response.data);
      })
      .catch(error => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  const onFinish = (values) => {
    // Create payload matching the LecturerDTO structure
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      departmentName: values.departmentName  // use the department name as provided by the dropdown
    };

    axios.post(api + "lecturers/register", payload)
      .then(response => {
        console.log("Lecturer registered successfully:", response.data);
        // Display success notification
        notification.success({
          message: "Registration Successful",
          description: "Lecturer registered successfully.",
        });
        // Optionally reset form fields
        form.resetFields();
      })
      .catch(error => {
        console.error("Error registering lecturer:", error);
        // Display error notification
        notification.error({
          message: "Registration Failed",
          description: "There was an error registering the lecturer. Please try again.",
        });
      });
  };

  return (
    <div className="lecture-registration-container">
      <h1>Register New Lecturer</h1>
      <Form
         form={form}
         name="lectureRegistration"
         layout="vertical"
         onFinish={onFinish}
         autoComplete="off"
      >
         <Form.Item
           name="firstName"
           label="First Name"
           rules={[{ required: true, message: 'Please enter the first name!' }]}
         >
            <Input />
         </Form.Item>

         <Form.Item
           name="lastName"
           label="Last Name"
           rules={[{ required: true, message: 'Please enter the last name!' }]}
         >
            <Input />
         </Form.Item>

         <Form.Item
           name="email"
           label="Email"
           rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
         >
            <Input />
         </Form.Item>

         <Form.Item
           name="departmentName"
           label="Department"
           rules={[{ required: true, message: 'Please select your department!' }]}
         >
            <Select placeholder="Select Department">
              {departments.map(dept => (
                <Select.Option key={dept.departmentId} value={dept.departmentName}>
                  {dept.departmentName}
                </Select.Option>
              ))}
            </Select>
         </Form.Item>

         <Form.Item>
           <Space>
              <Button type="primary" htmlType="submit">Submit</Button>
              <Button htmlType="reset">Reset</Button>
           </Space>
         </Form.Item>
      </Form>
    </div>
  );
};

export default LectureRegistration
