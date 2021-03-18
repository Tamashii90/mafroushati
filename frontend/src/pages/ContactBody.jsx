import React from "react";

export default function ContactBody() {
  const submitForm = e => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 align-self-center">
          <div className="mb-3">
            <u>Al-Najmah Square (main):</u>
            <br />
            <span className="mr-2">{"\u{1F4DE}"}</span>
            <span>+963-11-0000000</span>
          </div>
          <div className="mb-3">
            <u>Al-Baramkeh:</u>
            <br />
            <span className="mr-2">{"\u{1F4DE}"}</span>
            <span>+963-11-9999999</span>
          </div>
          <div className="mb-3">
            <u>Al-Bahsa:</u>
            <br />
            <span className="mr-2">{"\u{1F4DE}"}</span>
            <span>+963-11-8888888</span>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <h4 className="mb-4">Contact Us</h4>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Feedback</label>
              <textarea
                className="form-control"
                name="message"
                id="message"
                cols="30"
                rows="5"
                required
              ></textarea>
              <button className="btn btn-primary mt-3" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
