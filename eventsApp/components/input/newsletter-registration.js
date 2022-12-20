import { useContext, useRef, useState } from "react";
import NotificationContext from "../../store/notificationContext";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [signupStatus, setSignupStatus] = useState();
  const emailInputRef = useRef();
  const { notification, showNotification, hideNotification } =
    useContext(NotificationContext);
  function registrationHandler(event) {
    event.preventDefault();
    const email = emailInputRef.current.value;
    showNotification({
      title: "Signing up ...",
      message: "Registering for newsletter",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong");
        });
      })
      .then((res) => {
        showNotification({
          title: "Success",
          message: "Registered for newsletter",
          status: "success",
        });
        console.log(res);
        setSignupStatus(res);
      })
      .catch((err) =>
        showNotification({
          title: "Error",
          message: err.message || "Something went wrong",
          status: "error",
        })
      );
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      {signupStatus && <p>Successfully Signed Up!!</p>}
    </section>
  );
}

export default NewsletterRegistration;
