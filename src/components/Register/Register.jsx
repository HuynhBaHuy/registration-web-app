import { useForm, Controller } from "react-hook-form";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import styles from './styles.module.scss';
import React from "react";
import constants from "../../constants";
function Register() {
    const { handleSubmit, control, } = useForm();
    const onSubmit = (data) => {
        const { fullName, email, password } = data;
        console.log(fullName, email, password);
        fetch(`${constants.apiConfig.DOMAIN_NAME}${constants.apiConfig.ENDPOINT.register}`, {
            method: constants.apiConfig.methods.post,
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ fullName, email, password }),   
        }).then((response) => {
            return response.json();
        }
        ).then((data) => {
            console.log(data);
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
            <strong className={styles.title}>Register Form</strong>
            <Controller
                name="email"
                control={control}
                render={({ field }) =>
                    <Input
                        {...field}
                        className={styles.input}
                        placeholder="Enter your email"
                        size="large"
                        prefix={<MailOutlined />}
                    ></Input>} />
            <Controller
                name="fullName"
                control={control}
                render={({ field }) =>
                    <Input
                        {...field}
                        className={styles.input}
                        placeholder="Enter your name"
                        size="large"
                        prefix={<UserOutlined />}
                    ></Input>} />
            <Controller
                name="password"
                control={control}
                render={({ field }) =>
                    <Input.Password
                        className={styles.input}
                        {...field}
                        placeholder="Enter password"
                        size="large"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />} />
            <button type="submit" className={styles.button} >
                Register
            </button>
        </form>
    );
}
export default Register;