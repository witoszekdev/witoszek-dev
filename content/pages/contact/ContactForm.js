/** @jsx jsx */
import { jsx, useColorMode } from 'theme-ui';
import { navigate } from 'gatsby';
import { Box, Input, Textarea, Button, Text } from '@theme-ui/components';
import { Formik, Field, ErrorMessage } from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';

const formSchema = yup.object({
  email: yup
    .string()
    .email("This doesn't look like correct e-mail address")
    .required('E-mail is required'),
  message: yup
    .string()
    .min(10, 'Please send message longer than 10 characters')
    .max(
      50000,
      'This message looks very big, please send it as regular e-mail message'
    )
    .required('You have to write something :)'),
});

function encode(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

export default function ContactForm() {
  const [theme] = useColorMode();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: ['flex-start', 'center', 'flex-end'],
      }}
    >
      <Box
        p={3}
        sx={{
          backgroundColor: 'muted',
          boxShadow: 'lg',
          width: ['full', '4/6', '7/12'],
          borderRadius: 'default',
        }}
      >
        <Formik
          initialValues={{ email: '', message: '', captcha: null }}
          onSubmit={async ({ captcha, ...values }, actions) => {
            try {
              await fetch('/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: encode({
                  'form-name': 'contact',
                  'g-recaptcha-response': captcha,
                  ...values,
                }),
              });
              await navigate('/contact/thank-you/');
            } catch (e) {
              actions.setErrors({
                general:
                  'There was a problem with submitting the form. Please try again.',
              });
            }
          }}
          validationSchema={formSchema}
        >
          {({
            errors,
            touched,
            handleSubmit,
            submitting,
            setFieldValue,
            values,
          }) => (
            <form
              onSubmit={handleSubmit}
              name="contact"
              action="/contact/thank-you/"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
            >
              {console.log(values)}
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
                    ? 'inputs.pillError'
                    : 'inputs.pill'
                }
                as={Input}
                disabled={submitting}
              />
              <ErrorMessage
                name="email"
                component={Text}
                sx={{ marginTop: '1', color: 'error' }}
              />
              <Field
                name="message"
                as={Textarea}
                placeholder="What can I help you with?"
                rows={4}
                mt={3}
                variant={
                  errors.message && touched.message
                    ? 'inputs.pillError'
                    : 'inputs.pill'
                }
                sx={{ resize: 'vertical', fontFamily: 'sans' }}
                disabled={submitting}
              />
              <ErrorMessage
                name="message"
                component={Text}
                sx={{ marginTop: '1', color: 'error' }}
              />
              <Box
                mt={3}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <ReCAPTCHA
                  sitekey="6Ldhp-UUAAAAALgJLyGA9znKoFH1PpbTTOK8NaWf"
                  theme={theme}
                  onChange={(val) => setFieldValue('captcha', val)}
                />
                <Button mt={2} type="submit" variant="buttons.elevated">
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
