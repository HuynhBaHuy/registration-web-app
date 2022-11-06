// @ts-nocheck
import { Button } from "antd";
import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
function Home() {
    const navigate = useNavigate();

    const mutation = useMutation((token) => {
        console.log("Token", token);
        return fetch(`${constants.apiConfig.DOMAIN_NAME}${constants.apiConfig.ENDPOINT.profile}`, {
            method: constants.apiConfig.methods.get,
            headers: {
                "Content-type": "application/json",
                "x-access-token": token
            },
        }).then((response) => {
            return response.json();
        })
    });
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            mutation.mutate(token);
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {mutation.isLoading && <p>Loading...</p>}
            {mutation.isError && <p>Error</p>}
            {mutation.isSuccess && (
                <div>
                    <p>Full name: {mutation.data?.data?.fullName}</p>
                    <p>Email: {mutation.data?.data?.email}</p>
                    <Button onClick={()=> {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</Button>
                </div>
            )}

        </div>
    );
}
export default Home;