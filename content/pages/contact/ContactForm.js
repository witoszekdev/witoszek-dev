import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const formSchema = yup.object({
  email: yup.string().email("This doesn't look like correct e-mail address"),
  message: yup
    .string()
    .min(10, "Please send message longer than 10 characters")
    .max(
      50000,
      "This message looks very big, please send it as regular e-mail message"
    ),
});

export default function ContactForm() {
  return (
    <Formik
      initialValues={{ email: "", message: "" }}
      onSubmit={values => {}}
      validationSchema={formSchema}>
      <Form>
        <Field type="email" name="email" placeholder="your e-mail" />
        <ErrorMessage name="email" />
        <Field name="message" component="textarea" />
        <ErrorMessage name="message" />
        <button type="submit">Send</button>
      </Form>
    </Formik>
  );
}
