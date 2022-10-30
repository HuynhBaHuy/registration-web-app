import { useForm, Controller } from "react-hook-form";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import styles from './styles.module.scss';
import React from "react";
function Register() {
    const { handleSubmit, control, } = useForm();
    const onSubmit = data => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
            <strong>Register Form</strong>
            <Controller
                name="username"
                control={control}
                render={({ field }) =>
                    <Input
                        {...field}
                        className={styles.input}
                        placeholder="Enter your username"
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