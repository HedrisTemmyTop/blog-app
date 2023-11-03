import { toast } from "react-toastify";
export const toastSuccess = function ({ message, closeAt, id }) {
  return toast.success(message, {
    autoClose: closeAt,
    toastId: id,
  });
};
