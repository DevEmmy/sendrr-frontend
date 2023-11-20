import toast, { Toaster } from 'react-hot-toast';

export const toastSuccess = (message) => toast.success(message, {
    // icon: "🔔",
    style: {
        borderRadius: '36px',
        background: "#000",
        color: "white",
        border: "2px solid #741786",
        textAlign: "start"
    }
});
export const toastError = (message) =>  toast.error(message, {
    style: {
        borderRadius: '36px',
        background: "#000",
        color: "white",
        border: "2px solid #741786",
        textAlign: "start"
    }
})

export const toastMessage = (message)=> toast(message,  {
    icon: "🔔",
    style: {
        borderRadius: '36px',
        background: "#000",
        color: "white",
        border: "2px solid #741786",
        textAlign: "start"
    }
})