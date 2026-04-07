// src/utils/toast.js
// Wrapper around react-toastify that uses the message as toastId,
// so repeated calls replace the existing toast instead of stacking.
import { toast as _toast } from "react-toastify";

const toastFn = (type, message, options = {}) => {
  const id = options.toastId ?? String(message);
  _toast[type](message, { toastId: id, ...options });
};

const toast = {
  success: (msg, opts) => toastFn("success", msg, opts),
  error:   (msg, opts) => toastFn("error",   msg, opts),
  warning: (msg, opts) => toastFn("warning", msg, opts),
  info:    (msg, opts) => toastFn("info",    msg, opts),
};

export default toast;
