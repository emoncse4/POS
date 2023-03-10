import React from 'react';
import { Button, Input, Form, message } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handlerSubmit = async (value) => {
        try {
            dispatch({
              type: "SHOW_LOADING",
            });
            const res = await axios.post('/api/users/login', value);
            dispatch({
              type: "HIDE_LOADING",
            });
            message.success("User Login Successfully!")
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate("/");
            
          }catch(error) {
            dispatch({
              type: "HIDE_LOADING",
            });
            message.error("Error!")
            console.log(error);
          }
    };

    useEffect(() => {
      if(localStorage.getItem("auth")) {
      localStorage.getItem("auth");
      navigate("/");
      }
    }, [navigate]);

  return (
    <div className='form'>
        <h2>POS</h2>
        <p>Login</p>
        <div className="form-group">
        <Form layout='vertical' onFinish={handlerSubmit}>
          <FormItem name="userId" label="User ID">
            <Input />
          </FormItem>
          <FormItem name="password" label="Password">
            <Input type="password"/>
          </FormItem>
          <div className="form-btn-add">
            <Button htmlType='submit' className='add-new'>Login</Button>
            <Link className='form-other' to="/register">Register Here!</Link>
          </div>
        </Form>
        </div>
    </div>
  )
};

export default Login