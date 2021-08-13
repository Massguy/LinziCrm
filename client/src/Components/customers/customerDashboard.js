import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
const CustomerDashboard = ({
  customerCode,
  customerName,
  phoneNumber,
  email,
  id,
}) => {
  return (
    <>
      <div className="customerContainer">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td style={{ width: "20%" }}>{customerCode}</td>

              <td style={{ width: "40%" }}>
                {" "}
                <Link to={`/dashboard/admin/customers/${id}`}>
                  {customerName}
                </Link>
              </td>

              <td style={{ width: "40%" }}>{phoneNumber}</td>
              {/* <td style={{ width: "35%" }}>{email}</td> */}
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default CustomerDashboard;
