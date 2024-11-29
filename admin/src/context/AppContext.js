import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { ShowToast, Severty } from '../helper/toast';
import useRequest from '../hooks/useRequest';
export const AppStateContext = createContext();


export const AppContextProvider = ({ children }) => {

    const { request } = useRequest()

    const [bannerList, setBannnerList] = useState([])

    useEffect(() => {
        // if (bannerList.length !== 0) return
        // console.log("Banner List");
        // request({
        //     url: '/auth/bannerListing',
        //     method: 'POST',
        //     data: {
        //         banner_type: "Search_page",
        //         banner_for: "Mobile"
        //     },
        //     onSuccess: ({ data, status }) => {
        //         if (status) {
        //             setBannnerList(data)
        //         } else {
        //             setBannnerList([])
        //         }

        //     },
        //     onError: (err) => setBannnerList([])
        // })
    }, [])

    return (
        <AppStateContext.Provider
            value={{
                bannerList
            }}>
            {children}
        </AppStateContext.Provider>
    );
};