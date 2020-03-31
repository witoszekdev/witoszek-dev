/** @jsx jsx */
import React from "react";
import { jsx } from "@theme-ui/core";
import { navigate } from "gatsby";
import { Box, Input, Textarea, Button, Text } from "@theme-ui/components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const formSchema = yup.object({
  email: yup
    .string()
    .email("This doesn't look like correct e-mail address")
    .required("E-mail is required"),
  message: yup
    .string()
    .min(10, "Please send message longer than 10 characters")
    .max(
      50000,
      "This message looks very big, please send it as regular e-mail message"
    )
    .required("You have to write something :)"),
});

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function ContactForm() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: ["flex-start", "center", "flex-end"],
      }}
    >
      <Box
        p={3}
        sx={{
          backgroundColor: "muted",
          boxShadow: "lg",
          width: ["full", "4/6", "7/12"],
          borderRadius: "default",
        }}
      >
        <Formik
          initialValues={{ email: "", message: "" }}
          onSubmit={async (values, actions) => {
            try {
              await fetch("/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: encode({ "form-name": "contact", ...values }),
              });
              await navigate("/contact/thank-you/");
            } catch (e) {
              actions.setErrors({
                general:
                  "There was a problem with submitting the form. Please try again.",
              });
            }
          }}
          validationSchema={formSchema}
        >
          {({ errors, touched, handleSubmit, submitting }) => (
            <form
              onSubmit={handleSubmit}
              name="contact"
              action="/contact/thank-you/"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <h3 sx={{ marginTop: 0 }}>Contact Form</h3>
              {errors.general && (
                <Box bg="errorBg" color="error" mb={3} p={3}>
                  {errors.general}
                </Box>
              )}
              <Field
                type="email"
                name="email"
                placeholder="Your e-mail"
                variant={
                  errors.email && touched.email
                    ? "inputs.pillError"
                    : "inputs.pill"
                }
                as={Input}
                disabled={submitting}
              />
              <ErrorMessage
                name="email"
                component={Text}
                sx={{ marginTop: "1", color: "error" }}
              />
              <Field
                name="message"
                as={Textarea}
                placeholder="What can I help you with?"
                rows={4}
                mt={3}
                variant={
                  errors.message && touched.message
                    ? "inputs.pillError"
                    : "inputs.pill"
                }
                sx={{ resize: "vertical", fontFamily: "sans" }}
                disabled={submitting}
              />
              <ErrorMessage
                name="message"
                component={Text}
                sx={{ marginTop: "1", color: "error" }}
              />
              <Box
                mt={3}
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
                  variant="buttons.elevated"
                  sx={{ alignSelf: "flex-end" }}
                >
                  Send
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
