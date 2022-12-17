import Swal from "sweetalert2";
export const alertSuccess = (title, text) => {
  Swal.fire({
    icon: "success",
    title: title,
    text: text,
    confirmButtonColor: "#8D9EFF",
    showConfirmButton: true,
    timer: 1500,
    confirmButtonText: "Ok",
  });
};
export const alertError = (title, text) => {
  Swal.fire({
    icon: "error",
    title: title,
    text: text,
  });
};
