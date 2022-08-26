import React, { useState } from "react";
import ReactDOM from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import { withFormik } from "formik";

import "./styles.css";

const today = new Date();

const App = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched
  } = props;

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="validationFormik03">
          <Form.Label>Date</Form.Label>

          <DatePicker
            selected={values.date}
            onChange={(e) => {
                setFieldValue('date', e);
                setFieldTouched('date');
              }}
            className="form-control"
            minDate={today}
            customInput={
              <input
                type="text"
                id="validationCustom01"
                placeholder="First name"
              />
            }
          />
          {touched.date && !!errors.date && errors.date}
        </Form.Group>
        <Form.Group controlId="validationFormik01">
          <Form.Label>First name</Form.Label>
          <Form.Control type="text" name="firstName" />
        </Form.Group>
        <Form.Group controlId="validationFormik02">
          <Form.Label>Last name</Form.Label>
          <Form.Control type="text" name="lastName" />
        </Form.Group>
        <button type="submit">
            Submit
          </button>
      </Form>
    </div>
  );
};

const ValidatedForm = withFormik({
  mapPropsToValues: () => ({
    date: null
  }),

  // Custom sync validation
  validate: values => {
    const errors = {};

    if (!values.date) {
      errors.date = "Please select a date";
    }

    return errors;
  },

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  },

  displayName: "BasicForm"
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<ValidatedForm />, rootElement);
