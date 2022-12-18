import Swal from 'sweetalert2';

function showResponseSuccess(message, title = 'Fetch Success') {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    showConfirmButton: false,
    timer: 2500,
  });
}

function showResponseFailed(text, title = 'failed') {
  Swal.fire({
    icon: 'info',
    title,
    text,
  });
}

function showErrorMessage(message) {
  Swal.fire({
    icon: 'error',
    title: 'error',
    text: message,
  });
}

export { showResponseSuccess, showResponseFailed, showErrorMessage };
