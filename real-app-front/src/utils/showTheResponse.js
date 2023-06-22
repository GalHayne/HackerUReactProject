import { toast } from "react-toastify";

const showTheResponse = (res) => {
  toast.error(res.response.data);

  return;
};

export default showTheResponse;
