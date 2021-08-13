import React, { useEffect, useState } from "react";

import DashboardLayout from "../../../hoc/dashboardLayout";

import { useFormik } from "formik";
import { errorHelper } from "../../../utils/tools";
import Loader from "../../../utils/loader";
import { validation, formValues, getValuesToEdit } from "./formValues";

import { useDispatch, useSelector } from "react-redux";
import { clearCurrentPipeline } from "../../../store/actions/index";
import {
  pipelineEdit,
  getPipelineById,
} from "../../../store/actions/pipeline.action";


import { TextField, Button, Divider } from "@material-ui/core";

const EditPipeline = (props) => {
  const [values, setValues] = useState(formValues);
  const [loading, setLoading] = useState(false);
  const pipeline = useSelector((state) => state.pipeline);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: validation,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setLoading(true);
    dispatch(pipelineEdit(values, props.match.params.id));
  };

  useEffect(() => {
    if (notifications) {
      setLoading(false);
    }
  }, [notifications]);

  useEffect(() => {
    const param = props.match.params.id;

    if (param) {
      dispatch(getPipelineById(param));
    }
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    if (pipeline && pipeline.byId) {
      setValues(getValuesToEdit(pipeline.byId));
    }
  }, [pipeline]);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentPipeline());
    };
  }, [dispatch]);
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
              Edit Pipeline
            </Button>
          </form>
        </>
      )}
    </DashboardLayout>
  );
};

export default EditPipeline;
