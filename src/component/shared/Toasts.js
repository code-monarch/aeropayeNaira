import { toast, Slide } from "react-toastify";

export const toastError = (errorMessage) => {
  return toast.error(errorMessage, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    toastId: "error",
    transition: Slide,
  });
};

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    toastId: "success",
    transition: Slide,
  });
};

export const toastWarning = (message) => {
  return toast.warning(message, {
    position: toast.POSITION.TOP_RIGHT,
    hideProgressBar: true,
    toastId: "warning",
    transition: Slide,
  });
};
export const toastLoading = (message) => {
  return toast.loading(message, {
    position: toast.POSITION.TOP_CENTER,
    hideProgressBar: true,
    toastId: "loading",
    transition: Slide,
  });
};
