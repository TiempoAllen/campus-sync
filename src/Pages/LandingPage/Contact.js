import React from "react";
import * as Form from "@radix-ui/react-form";

const Contact = () => {
  return (
    <section
      class="contact text-light text-center text-md-start p-5"
      id="contact"
    >
      <div class="container">
        <div class="row g-4 d-flex justify-content-center">
          <div class="col-md-5 contact-info d-flex flex-column justify-content-center align-items-start">
            <h2 class="mb-4">
              Come see us and <br />{" "}
              <span class="text-info">Get in touch!</span>
            </h2>
            <p class="lead fs-6">
              <img src="/images/address-icon.svg" alt="address" />
              <span class="fw-bold">Address:</span> N. Bacalso Avenue, Cebu
              City, Philippines 6000
            </p>
            <p class="lead fs-6">
              <img src="/images/email-icon.svg" alt="email" />
              <span class="fw-bold">Email:</span> johnallen.tiemp@cit.edu
            </p>
            <div id="map" class="d-none d-md-block"></div>
          </div>
          <div class="input-card col-md-5 d-flex flex-column justify-content-center align-items-center">
            <Form.Root className="FormRoot-contact">
              <Form.Field className="FormField-contact" name="email">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabel-contact">Email</Form.Label>
                </div>
                <Form.Control asChild>
                  <input className="Input-contact" type="email" required />
                </Form.Control>
              </Form.Field>
              <Form.Field className="FormField-contact" name="question">
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                  }}
                >
                  <Form.Label className="FormLabe-contactl">
                    Question
                  </Form.Label>
                </div>
                <Form.Control asChild>
                  <textarea className="Textarea-contact" required />
                </Form.Control>
              </Form.Field>
              <Form.Submit asChild>
                <button className="Button-contact" style={{ marginTop: 10 }}>
                  Send
                </button>
              </Form.Submit>
            </Form.Root>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
