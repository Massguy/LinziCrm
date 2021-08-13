import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cookie from "react-cookies";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
export const LinziJayButton = (props) => {
  let template = "";

  switch (props.type) {
    case "default":
      template = (
        <Link
          className={!props.altClass ? "link_default" : props.altClass}
          to={props.linkTo}
          style={{
            ...props.style,
          }}
        >
          {props.title}
        </Link>
      );
      break;
    default:
      template = "";
  }

  return template;
};

export const showToast = (type, msg) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;
    case "ERROR":
      toast.error(msg, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      break;
    default:
      return false;
  }
};

export const errorHelper = (formik, value) => ({
  error: formik.errors[value] && formik.touched[value] ? true : false,
  helperText:
    formik.errors[value] && formik.touched[value] ? formik.errors[value] : null,
});

export const getTokenCookie = () => cookie.load("x-access-token");
export const removeTokenCookie = () =>
  cookie.remove("x-access-token", { path: "/" });
export const getAuthHeader = () => {
  return { headers: { Authorization: `Bearer ${getTokenCookie()}` } };
};

const auth_id = "f6500cfe-5991-422f-aa8d-fd18a814e47b";
const auth_key =
  "VlVnsmU3Lq2yDcnSMGAtn6bhrJ4sowsG9BOn5yIFo5R0Lsy7jmGLw5YKcuTvWGwrFtHIBdHCUoc1ClWGsQ==";

export const getAuthHeader2 = () => {
  const hmacSignature = Base64.stringify(
    hmacSHA256("pageSize=15&&customer=", auth_key)
  );
  return {
    headers: {
      //'Authorization':`Bearer ${getTokenCookie()}`,
      "content-Type": "application/json",
      Accept: "application/json",
      "api-auth-id": auth_id,
      "api-auth-signature": hmacSignature,
      "client-type": "linzi",
    },
  };
};
