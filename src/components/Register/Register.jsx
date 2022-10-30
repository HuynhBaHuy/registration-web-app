// @ts-nocheck
import { useForm, Controller } from "react-hook-form";
import { UserOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Input } from 'antd';
import styles from './styles.module.scss';
import React from "react";
import constants from "../../constants";
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from "helpers/validate";
import { failureModal, successModal } from "modals";
function Register() {
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
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
            if (data?.code === 200) {
                successModal("Register success", `Welcome User ${data?.data?.fullName}`);
                console.log("Data receiver", data);
            } else {
                failureModal("Register Failed", data?.message ?? 'unknown message');
            }
        }).catch((error) => {
            console.error("Error", error.message);
            failureModal("Register failed", error.message)
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
            <p className={styles.title}>Register Your Information</p>
            <div className={styles.inputWrapper}>
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
                <span className={styles.message}>{errors?.email?.message}</span>
            </div>
            <div className={styles.inputWrapper}>

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
                <span className={styles.message}>{errors?.fullName?.message}</span>
            </div>
            <div className={styles.inputWrapper}>

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
                <span className={styles.message}>{errors?.password?.message}</span>
            </div>
            <div className={styles.btnWrapper}>
                <button type="submit" className={styles.button} >
                    Register
                </button>
                <Link to='/' className={styles.button} >
                    Login
                </Link>
            </div>
        </form>
    );
}
export default Register;