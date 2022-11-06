// @ts-nocheck
import { Button } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import constants from "../../constants";
function Home() {
    const navigate = useNavigate();

    const queries = useQuery({
        queryKey: "users",
        queryFn: () => {
            const token = localStorage.getItem("token");
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
        },
        onSuccess: (data) => {
            if(data?.code===200){
                console.log(data);
            }else{
                navigate("/login");
            }
        },
        onError: (error) => {
            console.log("Error", error);
        }
    });

    return (
        <div>
            <h1>Home</h1>
            {queries.isLoading && <p>Loading...</p>}
            {queries.isError && <p>Error</p>}
            {queries?.data?.data && (
                <div>
                    <p>Full name: {queries.data?.data?.fullName}</p>
                    <p>Email: {queries.data?.data?.email}</p>
                    <Button onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }}>Logout</Button>
                </div>
            )}

        </div>
    );
}
export default Home;