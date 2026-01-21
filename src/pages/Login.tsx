import React from 'react';
import { Form, Input, Button, message } from "antd"
import { useNavigate } from 'react-router-dom';
import type { FormInstance } from 'antd';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {

    const navigate = useNavigate();

    const onFinish = (values: LoginFormValues): void => {

        navigate("/home");

        // const { username, password} = values; 
        // console.log("values:",values);
        // if( username === "admin" && password === "12345678") {
        //     message.success("登录成功！");
        //     navigate("/home");
        // }else{
        //     message.error("用户名或密码错误！");
        // }
    };

    return (
        <div>
            <Form<LoginFormValues>
                name="login"
                onFinish={onFinish}
                style={{ 
                    width: 500, 
                    height: 300, 
                    padding: 50, 
                    border: '1px solid #f0f0f0', 
                    borderRadius: 8 
                }} >
                <h2 
                    style={{ 
                        textAlign:"center",
                        }}>Login</h2>
                <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
                >
                <Input  />
                </Form.Item>

                <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                >
                <Input.Password  />
                </Form.Item>

                <Form.Item>
                <Button type="primary" htmlType="submit" block style={{ width:"80%" }}>
                    登录
                </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;