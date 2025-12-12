import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-secondary/10 px-8 py-10 text-center">
          <h1 className="text-4xl font-bold text-secondary mb-2">Terms of Service</h1>
          <p className="text-base-content/70">Last updated: December 12, 2025</p>
        </div>

        <div className="p-8 md:p-12 space-y-8 text-base-content/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">2. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide ensuring that the information is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">3. User Responsibilities</h2>
            <div className="space-y-3">
              <p><strong>For Tutors:</strong> You agree to provide accurate information about your qualifications and experience. You maintain professional conduct when interacting with students.</p>
              <p><strong>For Students:</strong> You agree to treat tutors with respect and pay for agreed-upon services promptly.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">4. Intellectual Property</h2>
            <p>
              The Service and its original content, features and functionality are and will remain the exclusive property of Bashar Teacher and its licensors. The Service is protected by copyright, trademark, and other laws of both the Bangladesh and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">5. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall Bashar Teacher, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-base-content mb-4">7. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>
          
          <div className="pt-6 border-t border-base-200">
             <p className="text-sm text-center italic">
               If you have any questions about these Terms, please contact us at legal@basharteacher.com
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
