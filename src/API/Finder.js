import { useContext } from "react";
import axios from "axios";
import { Context } from "../Contexts/Context";


let apiEndpoint;

if (process.env.REACT_APP_ENV === 'production') {
    apiEndpoint = process.env.REACT_APP_API_ENDPOINT_PROD;
} else if (process.env.REACT_APP_ENV === 'staging') {
    apiEndpoint = process.env.REACT_APP_API_ENDPOINT_STAGING;
} else {
    apiEndpoint = process.env.REACT_APP_API_ENDPOINT_DEVELOPMENT;
}


const instance = axios.create({ baseURL: apiEndpoint });

const Finder = () => {
    const { setIsConnected, setConnectedMessage } = useContext(Context);

    instance.interceptors.request.use(
        (config) => {
            // 在发送请求之前做些什么
            // 可以在这里设置 loading 状态等
            return config;
        },
        (error) => {
            // 对请求错误做些什么
            // 可以在这里设置 loading 状态等
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            // 对响应数据做些什么
            // 可以在这里关闭 loading 状态等
            return response;
        },
        (error) => {
            console.log(error)
            if (error.message === 'Network Error') {
                // 网络连接错误
                setConnectedMessage('您已斷線!');
                setIsConnected(false);
            } else if (error.code === 'ECONNABORTED') {
                // 请求超时
                setConnectedMessage('網路不佳，請再次嘗試!');
                setIsConnected(false);
            }
            else if(error.message === 'Request failed with status code 403'){
                setConnectedMessage('權限錯誤!');
                setIsConnected(false);
            }else if(error.response.status === 401){
                alert('請重新登入')
                localStorage.removeItem('name')
                localStorage.removeItem('token')
                window.location.assign('/')
            }
            else{
                // 其他错误
                return Promise.reject(error);
            }
        }
    );

    // 您的组件逻辑在此

    return instance;
}

export default Finder;
