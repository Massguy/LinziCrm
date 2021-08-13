import React, { useState, useEffect } from "react";

import DashboardLayout from "../../hoc/dashboardLayout";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";

import SearchBox from "../customers/searchbox";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import ProductDashboard from "./productDashboard";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState("");

  const auth_id = "f6500cfe-5991-422f-aa8d-fd18a814e47b";
  const auth_key =
    "VlVnsmU3Lq2yDcnSMGAtn6bhrJ4sowsG9BOn5yIFo5R0Lsy7jmGLw5YKcuTvWGwrFtHIBdHCUoc1ClWGsQ==";
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  useEffect(() => {
    const getAuthHeader2 = () => {
      const hmacSignature = Base64.stringify(
        hmacSHA256(`orderBy=availableQty`, auth_key)
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
    const fetchList = async () => {
      const result = await axios.get(
        `https://api.unleashedsoftware.com/StockOnHand/${currentPage}?orderBy=availableQty`,
        getAuthHeader2()
      );

      setProducts(result.data);
      console.log(result.data);
      setLoading(false);
    };
    fetchList();
  }, [currentPage, searchField]);
  return (
    <>
      <DashboardLayout title="Overview">
        <div className="productSearch">
        <SearchBox
          placeholder="search Product by code"
          handleChange={(e) => setSearchField(e.target.value)}
        />
        </div>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="productTable">
              <div>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th style={{ width: "25%" }}>Code</th>

                      <th style={{ width: "50%" }}>Product Description</th>
                      <th style={{ width: "25%" }}>Available</th>
                    </tr>
                  </thead>
                </Table>

                {products.Items.map((data, i) => {
                  return (
                    <div key={i}>
                      <ProductDashboard
                        productCode={data.ProductCode}
                        productDescription={data.ProductDescription}
                        availableQty={data.AvailableQty}
                      />
                    </div>
                  );
                })}
                <div className="paginationContainer">
                  <ReactPaginate
                    previousLabel={"Prev"}
                    onPageChange={handlePageClick}
                    pageCount={products.Pagination.NumberOfPages}
                    nextLabel={"Next"}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttns"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
