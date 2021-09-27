import React, { useState, useEffect } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import DateTimePicker from "react-datetime-picker";

const CustomerById = (props) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [editNote, setEditNote] = useState(false);

  const auth_id = "f6500cfe-5991-422f-aa8d-fd18a814e47b";
  const auth_key =
    "VlVnsmU3Lq2yDcnSMGAtn6bhrJ4sowsG9BOn5yIFo5R0Lsy7jmGLw5YKcuTvWGwrFtHIBdHCUoc1ClWGsQ==";

  const id = props.match.params.id;

  const getAuthHeader2 = () => {
    const hmacSignature = Base64.stringify(hmacSHA256(``, auth_key));
    return {
      headers: {
        "content-Type": "application/json",
        Accept: "application/json",
        "api-auth-id": auth_id,
        "api-auth-signature": hmacSignature,
        "client-type": "linzi",
      },
    };
  };

  const handleFirstDateChange = (date) => {
    setNote((prevState) => {
      return {
        ...prevState,
        content: date + " | " + prevState.content,
      };
    });
    setFirstDate(date);
  };

  const handleSecondDateChange = (date) => {
    console.log({ date });
    setNote((prevState) => {
      return {
        ...prevState,
        content: prevState.content + "\n" + date + " | ",
      };
    });
    setSecondDate(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    const fetchCustomer = async () => {
      const result = await axios.get(
        `https://api.unleashedsoftware.com/Customers/${id}`,
        getAuthHeader2()
      );
      setCustomers(result.data);

      setLoading(false);
    };
    fetchCustomer();
  }, [id]);

  useEffect(() => {
    const fetchCustomerNotes = async () => {
      const result = await axios.get(`http://localhost:3002/api/notes/${id}`);
      setNote(result.data[0]);
      console.log(id, result.data[0]);
    };
    fetchCustomerNotes();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title = "", content = "", _id = 0 } = note || {};
    console.log(firstDate);
    if (title && content) {
      try {
        // if (!editNote) {
        if (!note._id) {
          const response = await axios.post(
            "http://localhost:3002/api/notes",
            {
              title,
              content,
              customerId: id,
            },
            getAuthHeader2()
          );
          setNote(response.data);
        } else {
          const result = await axios.patch(
            `http://localhost:3002/api/notes/${_id}`,
            {
              title,
              content,
            },
            getAuthHeader2()
          );
          console.log({ note: result.data });
          setNote(result.data);
        }
        setSuccessMsg("Note added successfully.");
        setTimeout(() => {
          setSuccessMsg("");
        }, 2000);
      } catch (err) {
        console.log("an error occurred==>>", err);
      }
    }
  };

  return (
    <>
      <DashboardLayout>
        <div>
          <div>
            <h3>{customers.CustomerName}</h3>
            <p>Code : {customers.CustomerCode}</p>
            <p>
              Contact Name:{" "}
              {customers.ContactFirstName + " " + customers.ContactLastName}
            </p>
            <p>OfficePhone: {customers.PhoneNumber}</p>
            <p>
              Mobile:{" "}
              {customers.MobileNumber === null ? "nil" : customers.MobileNumber}
            </p>
            <p>Email: {customers.Email}</p>
            <p>Website: {customers.Website}</p>
          </div>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <div>
                  <h3>{customers.Addresses[0].AddressType} Address</h3>
                  <p> {customers.Addresses[0].AddressName}</p>
                  <p> {customers.Addresses[0].StreetAddress}</p>
                  <p> {customers.Addresses[0].StreetAddress2}</p>
                  <p> {customers.Addresses[0].City}</p>
                  <p> {customers.Addresses[0].Country}</p>
                  <p> {customers.Addresses[0].PostalCode}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e)} className="customerNotesForm">
          Select Start Date: <br />
          <DateTimePicker
            onChange={handleFirstDateChange}
            value={firstDate}
          />{" "}
          <br />
          Select End Date: <br />
          <DateTimePicker
            onChange={handleSecondDateChange}
            value={secondDate}
          />{" "}
          <br />
          Title:{" "}
          <input
            value={note?.title || ""}
            onChange={handleChange}
            name="title"
          />{" "}
          <br />
          Content:{" "}
          <textarea
            value={note?.content || ""}
            onChange={handleChange}
            name="content"
            style={{ height: "500px" }}
          />
          {successMsg !== "" && <p style={{ color: "green" }}>{successMsg}</p>}
          {editNote ? <button>Edit Note</button> : <button>Add Note</button>}
        </form>
      </DashboardLayout>
    </>
  );
};

export default CustomerById;
