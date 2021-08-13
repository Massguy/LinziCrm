import * as Yup from "yup";

export const formValues = {
  customerName: "",
  customerContactInward: "",
  customerContactOutward: "",
  followUp1: "",
  followUp2: "",
  customerNotes: "wowowowoow",
};

export const getValuesToEdit = (pipeline) => {
  return{
    customerName: pipeline.customerName,
    customerContactInward: pipeline.customerContactInward,
    customerContactOutward: pipeline.customerContactOutward,
    followUp1: pipeline.followUp1,
    followUp2: pipeline.followUp2,
    customerNotes: pipeline.customerNotes,
  }
}

export const validation = () =>
  Yup.object({
    customerName: Yup.string().required("Sorry, the Customer Name is required"),
    customerContactInward: Yup.string().required(
      "Sorry, the customer contact in ward is required"
    ),
    customerContactOutward: Yup.string(),
    followUp1: Yup.string(),
    followUp2: Yup.string(),
    customerNotes: Yup.string().required(
      "Sorry, the Customer Notes is required"
    ),
  });
