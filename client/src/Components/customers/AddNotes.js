import React, { useState } from "react";
const AddNotes = ({ customerNotes, customerName, addNotes }) => {
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(null);

  return (
    <>
      <h3>{customerName} customer Notes</h3>
      CustomerNotes: <p>{customerNotes}</p>
      <form onSubmit={(e) => addNotes(e, notes)}>
        <DatePicker date={date} onChange={(date) => setDate(date)} />
        <textarea
          name="textValue"
          value={notes}
          style={{ height: "700px" }}
          onChange={(e) => setNotes(e.target.value)}
          rows="5"
          placeholder={customerNotes}
          cols="33"
        ></textarea>
        <button>Add Notes</button>
      </form>
    </>
  );
};

export default AddNotes;
