import React from "react";
import styles from "../terms/Terms.module.scss";

const PrivacyPage = () => {
  return (
    <div className={styles.container}>
      <h1>Privacy Policy</h1>
      <p>
        At Aethera, we respect your privacy and are committed to protecting your
        personal data. This policy explains what information we collect, how we
        use it, and your rights.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        When you sign in, we may collect your name, email address, and other
        basic profile details provided by Microsoft Entra External ID or Google
        sign-in. When you place an order, we may also collect your shipping
        address and payment details (processed securely by our payment partners).
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>
        We use your data to create and manage your account, process your orders,
        provide customer support, and improve our services.
      </p>

      <h2>3. Third-Party Services</h2>
      <p>
        Authentication is provided by Microsoft Entra External ID (CIAM) and
        Google. Payments are processed securely by our payment provider. We do
        not store your credit card information.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal
        data at any time by contacting us.
      </p>

      <h2>5. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us
        at support@aethera.com.
      </p>
    </div>
  );
};

export default PrivacyPage;
