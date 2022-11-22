import { toast } from "react-toastify";
export const toastError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    delay: 0,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const toastSuccess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    delay: 0,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
