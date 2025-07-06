import "react-toastify/dist/ReactToastify.css";

import { toast, ToastOptions } from "react-toastify";

import { ShowToastProps } from "./types";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = ({
  message,
  variant = "success",
  position = "top-right",
}: ShowToastProps) => {
  const options: ToastOptions = {
    ...defaultOptions,
    position,
  };

  if (variant === "success") {
    toast.success(message, options);
  } else {
    toast.error(message, options);
  }
};
