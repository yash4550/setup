import axios from 'axios';
import React, { useState, useContext, useEffect } from "react";
import { BASE_URL } from '../constants/api_urls';
import { AuthContext } from "../context/AuthContext";
const client = axios.create({
    baseURL: BASE_URL,
});

const useRequest = () => {
    const { logout } = useContext(AuthContext)
    const request = async ({ url, method: tmethod, data, onSuccess, onError, header, onErrorSubmit }) => {
        const method = tmethod.trim().toUpperCase()
        let token = localStorage.getItem("token") ? localStorage.getItem("token") : '';

        const headers = {
            ...header,
            Authorization: `Bearer ${token}`
        };

        try {

            const response = await client({
                url,
                method,
                data,
                headers: { ...headers },
            })

            if (onSuccess) {
                // console.log(response.data, "response")
                onSuccess(response.data)
            }
            if (onError) {
                console.log(onError, "onError Jay")
            }
            else {
                onErrorSubmit(response.data)
            }
            return response.data
        }
        catch (err) {
            console.log(err)
            if (err.response.status === 401) {
                logout()
            }
            if (err.response.data.message === "jwt expired") {
                logout()
            }
            if (onError) {
                onError(err)
            }
            // throw err;
        }
    }

    return { request }
};

export default useRequest;