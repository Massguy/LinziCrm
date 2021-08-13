import React from "react";
import Table from "react-bootstrap/Table";

const ProductDashboard = ({
  productCode,
  productDescription,
  availableQty,
}) => {
  return (
    <>
    <div className="productDashboard">
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td style={{ width: "25%" }}>{productCode}</td>

            <td style={{ width: "50%" }}> {productDescription}</td>
            <td style={{ width: "25%" }}> {availableQty}</td>
          </tr>
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default ProductDashboard;
