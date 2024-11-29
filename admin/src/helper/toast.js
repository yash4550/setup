import { toast } from "react-toastify";

export const Severty = {
    SUCCESS: 'success',
    ERROR: 'error'
}

export const ShowToast = (message, type) => {

    switch (type) {
        case 'success': toast.success(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
            break;
        case 'error': toast.error(message, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
            break;
        default:
            break;
    }
}