import React,{useContext,useEffect,useState} from "react";
import { Form, Input, Button, Space, Select, DatePicker } from "antd";
import "./PersonalDetails.css";
import UserInfo from "../UserInfo/UserInfo";
import dayjs from "dayjs";
import api from "../../api/api";
import { AuthContext } from "../../AuthContext";

const PersonalDetails = () => {
  const [form] = Form.useForm();

  const [batches, setbatches] = useState([])

  useEffect(() => {
    const getBatches=async()=>{
      try {
        const response = await api.get('/api/batch/', {
          headers: { Authorization: `Bearer ${token.data}` },
        });
        setbatches(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getBatches()
    
  }, [])
  

  const { token } = useContext(AuthContext);

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

  const departmentMapping = {
    Computer: 101,
    "Electrical and Electronic": 102,
    Civil: 103,
    Mechanical: 104,
    None: 0,
  };

  const onFinish = async(values) => {
    const formattedValues = {
      studentId:values.regno,
      firstName: values.firstName,
      middleName: values.middleName,
      lastName: values.lastName,
      semester: parseInt(values.semester, 10),
      dateOfBirth: values.dateOfBirth.format("YYYY-MM-DD"),
      gender: values.gender,
      email: values.email,
      registrationDate: values.registrationDate.format("YYYY-MM-DD"),
      address: values.address
    };

    console.log(token.data)
    console.log(formattedValues)

    try {
      const response = await api.post('/api/students/register?department='+values.department+'&batch='+values.batch, formattedValues, {
        headers: { Authorization: `Bearer ${token.data}` },
      });
  
      console.log("Response:", response.data);
      
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <UserInfo
        username="John Doe"
        profilePicture="https://via.placeholder.com/40"
      />

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
            name="regno"
            label="Reg No"
            rules={[{ required: true, message: "Please enter your Reg No" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter your first name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="middleName"
            label="Middle Name"
            rules={[{ required: true, message: "Please enter your middle name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="University Email Address"
            rules={[
              { required: true, type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please choose your gender" }]}
          >
            <Select placeholder="Select your gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="batch"
            label="Batch"
            rules={[{ required: true, message: "Please choose your batch" }]}
          >
            <Select placeholder="Select your batch">
              {batches.map((batch) => (
                <Select.Option key={batch.batchId} value={batch.batchId}>
                  {batch.batchName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please choose your department!" }]}
          >
            <Select placeholder="Select your department">
              <Select.Option value="Computer">Computer</Select.Option>
              <Select.Option value="Electrical and Electronic">
                Electrical and Electronic
              </Select.Option>
              <Select.Option value="Civil">Civil</Select.Option>
              <Select.Option value="Mechanical">Mechanical</Select.Option>
              <Select.Option value="None">None</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="semester"
            label="Semester"
            rules={[{ required: true, message: "Please enter the semester!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "Please enter your date of birth!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="registrationDate"
            label="Registration Date"
            rules={[{ required: true, message: "Please enter the registration date!" }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="address"
            label="Permanent Address"
            rules={[{ required: true, message: "Please enter your permanent address!" }]}
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
