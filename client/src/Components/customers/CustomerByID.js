import React, { useState, useEffect } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";

import axios from "axios";

import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";

const CustomerById = (props) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [notes, setNotes] = useState([]);
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    noteId: "",
  });
  const [editNote, setEditNote] = useState(false);

  const auth_id = "f6500cfe-5991-422f-aa8d-fd18a814e47b";
  const auth_key =
    "VlVnsmU3Lq2yDcnSMGAtn6bhrJ4sowsG9BOn5yIFo5R0Lsy7jmGLw5YKcuTvWGwrFtHIBdHCUoc1ClWGsQ==";

  // const { id } = useParams()
  const id = props.match.params.id;

  const getAuthHeader2 = () => {
    const hmacSignature = Base64.stringify(hmacSHA256(``, auth_key));
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      const result = await axios.get(`http://77.68.32.110/apiapi/notes/${id}`);
      setNotes(result.data);
    };
    fetchCustomerNotes();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, content, noteId } = formData;
    try {
      if (!editNote) {
        const note = await axios.post(
          "http://77.68.32.110/apiapi/notes",
          {
            title,
            content,
            customerId: id,
          },
          getAuthHeader2()
        );
        setNotes([note.data, ...notes]);
        setFormData({ ...formData, title, content });
      } else {
        const note = await axios.patch(
          `http://77.68.32.110/apiapi/notes/${noteId}`,
          {
            title,
            content,
          },
          getAuthHeader2()
        );

        if (note) {
          const { title, content, _id } = note.data;
          const updatedRes = {
            title,
            content,
          };

          // setNotes([note.data, ...notes]);
          const updated = notes.map((i) => (i._id === _id ? updatedRes : i));
          setNotes(updated);
          setFormData({ ...formData, title: "", content: "" });
        }
      }
    } catch (err) {
      console.log("an error occurred==>>", err);
    }
  };

  const handleEdit = ({ title, content, _id }) => {
    // setNoteId(_id)
    setEditNote(true);
    // setTitle(title);
    // setContent(content);

    setFormData({
      title,
      content,
      noteId: _id,
    });
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

        {notes.map((note, i) => (
          <div key={i}>
            <div className="notesContainer">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p>Last Edited on </p>

              <button onClick={() => handleEdit(note)}>Edit</button>
            </div>
          </div>
        ))}

        <form onSubmit={(e) => handleSubmit(e)} className="customerNotesForm">
          Title:{" "}
          <input value={formData.title} onChange={handleChange} name="title" />{" "}
          <br />
          Content:{" "}
          <textarea
            value={formData.content}
            onChange={handleChange}
            name="content"
            style={{ height: "500px" }}
          />
          {editNote ? <button>Edit Note</button> : <button>Add Note</button>}
        </form>
      </DashboardLayout>
    </>
  );
};

export default CustomerById;
