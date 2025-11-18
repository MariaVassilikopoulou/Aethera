import React from "react";
import styles from "../terms/Terms.module.scss";
import Header from "../components/Header";

const TermsPage = () => {
  return (
      <><Header/>
    <div className={styles.container}>
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to Aethera. By accessing or using our website, you agree to be
        bound by the following terms and conditions.
      </p>

      <h2>1. General</h2>
      <p>
        These terms govern the use of our online store and services. Please read
        them carefully before making a purchase.
      </p>

      <h2>2. Purchases</h2>
      <p>
        All purchases made on our website are subject to product availability.
        We reserve the right to cancel or refuse an order.
      </p>

      <h2>3. Shipping & Returns</h2>
      <p>
        Shipping times may vary depending on location. Please refer to our
        Returns Policy for information on exchanges and refunds.
      </p>

      <h2>4. Privacy Policy</h2>
      <p>
        We respect your privacy. Your data will only be used to process orders
        and improve our services.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions regarding these terms, please contact us at
        supportt@aethera.com.
      </p>
    </div>
    </>
  );
};

export default TermsPage;
