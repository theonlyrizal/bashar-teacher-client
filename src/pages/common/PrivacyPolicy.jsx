import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-primary/10 px-8 py-10 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Privacy Policy</h1>
          <p className="text-base-content/70">Last updated: December 12, 2025</p>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-base-content/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">1. Introduction</h2>
            <p>
              Welcome to Bashar Teacher. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">2. The Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
              <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
              <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version.</li>
              <li><strong>Profile Data:</strong> includes your username and password, purchases or orders made by you, your interests, preferences, feedback and survey responses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal or regulatory obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">5. Third-Party Links</h2>
            <p>
              This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-base-200 rounded-lg inline-block">
              <p className="font-semibold">Bashar Teacher Support</p>
              <p>Email: privacy@basharteacher.com</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
