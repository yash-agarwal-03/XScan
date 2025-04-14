import toastr from "toastr";

let showToast = (type, title, message) => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: 300,
    hideDuration: 1000,
    timeOut: 4000,
    extendedTimeOut: 1000,
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };

  type = type.toLowerCase();
  if (type === "info") toastr.info(message, title);
  else if (type === "warning") toastr.warning(message, title);
  else if (type === "error") toastr.error(message, title);
  else toastr.success(message, title);
};

export default showToast;
