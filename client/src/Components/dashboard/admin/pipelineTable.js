import React from "react";
import { Table, Pagination, Modal, Button } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import Moment from "react-moment";
import Loading from "../../../utils/loader";

const PipelineTable = ({
  pipe,
  prev,
  next,
  gotoEdit,
  removeModal,
  handleClose,
  handleModal,
  handleRemove,
}) => {
  const goToPrevPage = (page) => {
    prev(page);
  };

  const goToNextPage = (page) => {
    next(page);
  };

  return (
    <>
      {pipe && pipe.docs ? (
        <>
        <div className="pipelineTable">
          <Table className='table' striped bordered hover>
            <thead>
              <tr>
                <th>Created</th>
                <th>CustomerName</th>
                <th>customerContactInward</th>
              </tr>
            </thead>
            <tbody>
              {pipe.docs.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Moment to={item.date}></Moment>
                  </td>
                  <td>{item.customerName}</td>
                  <td>{item.customerContactInward}</td>
                  <td
                    className="action_btn remove_btn"
                    onClick={() => handleModal(item._id)}
                  >
                    Remove
                  </td>
                  <td
                    className="action_btn edit_btn"
                    onClick={() => gotoEdit(item._id)}
                  >
                    Edit
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
          <Pagination>
            {pipe.hasPrevPage ? (
              <>
                <Pagination.Prev onClick={() => goToPrevPage(pipe.prevPage)} />
                <Pagination.Item onClick={() => goToPrevPage(pipe.prevPage)}>
                  {pipe.prevPage}
                </Pagination.Item>
              </>
            ) : null}
            <Pagination.Item active>{pipe.page}</Pagination.Item>
            {pipe.hasNextPage ? (
              <>
                <Pagination.Item onClick={() => goToNextPage(pipe.nextPage)}>
                  {pipe.nextPage}
                </Pagination.Item>
                <Pagination.Next onClick={() => goToNextPage(pipe.nextPage)} />
              </>
            ) : null}
          </Pagination>
          <hr />
          <LinkContainer to="/dashboard/admin/add_pipeline">
            <Button variant="secondary">Add product</Button>
          </LinkContainer>
        </>
      ) : (
        <Loading />
      )}
      <Modal show={removeModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you really sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>There is no going back.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Oops, close this now !!
          </Button>
          <Button variant="danger" onClick={() => handleRemove()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PipelineTable;
