import React, { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = (props) => {

        // customer 點餐紀錄的會員等級
        const [ loginModal, setLoginModal] = useState(false)
        const [ signupModal, setSignupModal] = useState(false)


        const [ singleNewId, setSingleNewId] = useState(0)
        const [ singleActivityId, setSingleActivityId] = useState(0)

        const [manageAllNews, setManageAllNews] =useState([])
        const [ manageAllActivity, setManageAllActivity ] =useState([])



        const [ manageAllFile, setManageAllFile ] =useState([])

        

        // Manage Page
        const [isUpdateModal, setIsUpdateModal] = useState(false)
        const [updateDetail, setUpdateDetail] = useState({})



        const [isLoading, setIsLoading] =useState(true)
        const [isConnected, setIsConnected] =useState(true)
        const [connectedMessage, setConnectedMessage] =useState(null)

        return (
            <Context.Provider value={{ loginModal, setLoginModal,
                                        signupModal, setSignupModal,
                                        singleNewId, setSingleNewId,
                                        manageAllFile, setManageAllFile,
                                        singleActivityId, setSingleActivityId,
                                        manageAllNews, setManageAllNews,
                                        manageAllActivity, setManageAllActivity ,
                                        isUpdateModal, setIsUpdateModal,
                                        updateDetail, setUpdateDetail,
                                        isLoading, setIsLoading,
                                        isConnected, setIsConnected,
                                        connectedMessage, setConnectedMessage
                                        }}>
                {props.children}
            </Context.Provider>
        )
    }
