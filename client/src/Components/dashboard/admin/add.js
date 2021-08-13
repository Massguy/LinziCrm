import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../hoc/dashboardLayout";

import { useFormik } from "formik";
import { errorHelper } from "../../../utils/tools";
import Loader from "../../../utils/loader";
import { validation } from "./formValues";

import { useDispatch, useSelector } from "react-redux";
import { pipelineAdd } from "../../../store/actions/pipeline.action";

import {
  TextField,
  Button,
  Divider,

} from "@material-ui/core";

const AddPipeline = (props) => {
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerContactInward: "",
      customerContactOutward: "",
      followUp1: "",
      followUp2: "",
      customerNotes: "",
    },
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(pipelineAdd(values));
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      props.history.push("/dashboard/admin/admin_pipeline");
    }
    if (notifications && notifications.error) {
      setLoading(false);
    }
  }, [notifications, props.history]);
  return (
    <DashboardLayout title="Add pipeline">
      {loading ? (
        <Loader />
      ) : (
        <>
          <form className="mt-3 article_form" onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="customerName"
                label="Enter a Customer Name"
                variant="outlined"
                {...formik.getFieldProps("customerName")}
                {...errorHelper(formik, "customerName")}
              />
            </div>

            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="customerContactInward"
                label="Enter customer Contact Inward"
                variant="outlined"
                {...formik.getFieldProps("customerContactInward")}
                {...errorHelper(formik, "customerContactInward")}
              />
            </div>

            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="customerContactOutward"
                label="Enter the customer Contact Outward"
                variant="outlined"
                {...formik.getFieldProps("customerContactOutward")}
                {...errorHelper(formik, "customerContactOutward")}
              />
            </div>

            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="followUp1"
                label="Enter the followUp1"
                variant="outlined"
                {...formik.getFieldProps("followUp1")}
                {...errorHelper(formik, "followUp1")}
                multiline
                rows={4}
              />
            </div>
            <Divider className="mt-3 mb-3" />

            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="followUp2"
                label="Enter the followUp 2"
                variant="outlined"
                {...formik.getFieldProps("followUp2")}
                {...errorHelper(formik, "followUp2")}
                multiline
                rows={4}
              />
            </div>

            <Divider className="mt-3 mb-3" />

            <div className="form-group">
              <TextField
                style={{ width: "100%" }}
                name="customerNotes"
                label="Enter the customer Notes"
                variant="outlined"
                {...formik.getFieldProps("customerNotes")}
                {...errorHelper(formik, "customerNotes")}
                multiline
                rows={4}
              />
            </div>

            <Divider className="mt-3 mb-3" />

            <Button variant="contained" color="primary" type="submit">
              Add Pipeline
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default AddPipeline;
