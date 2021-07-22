import React, { useState, useEffect } from "react";
import DashboardLayout from "../../hoc/dashboardLayout";

import axios from "axios";

import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
const CustomerById = (props) => {
  console.log(props);
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  const auth_id = "f6500cfe-5991-422f-aa8d-fd18a814e47b";
  const auth_key =
    "VlVnsmU3Lq2yDcnSMGAtn6bhrJ4sowsG9BOn5yIFo5R0Lsy7jmGLw5YKcuTvWGwrFtHIBdHCUoc1ClWGsQ==";
  console.log("here");

  // const { id } = useParams()
  const id = props.match.params.id;
  console.log(id, "<====id");

  useEffect(() => {
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
  console.log(customers);

  return (
    <>
      <DashboardLayout>
        <h1>{customers.CustomerName}</h1>
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
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div>
                {customers.Addresses.map((data, i) => {
                  return (
                    <div key={i}>
                      <h3> Address Type: {data.AddressType} </h3>
                      <p> Address Name: {data.AddressName} </p>
                      <p> StreetAddress: {data.StreetAddress} </p>
                      <p> StreetAddress2: {data.StreetAddress2} </p>
                      <p> City: {data.City} </p>
                      <p> Country: {data.Country} </p>
                      <p> PostalCode: {data.PostalCode} </p>
                    </div>
                  );
                })}
                <h5>Customer Notes: </h5>
                <textarea rows="60" cols="0" />
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default CustomerById;
