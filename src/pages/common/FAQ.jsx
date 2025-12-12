import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, toggle }) => {
  return (
    <div className="border border-base-300 rounded-xl overflow-hidden mb-4 bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={toggle}
      >
        <span className="font-semibold text-lg text-base-content">{question}</span>
        {isOpen ? (
          <FaChevronUp className="text-primary" />
        ) : (
          <FaChevronDown className="text-base-content/50" />
        )}
      </button>
      <div
        className={`px-6 text-base-content/80 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 py-4 border-t border-base-200' : 'max-h-0'
        }`}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    {
      question: "How do I find a tutor for my subject?",
      answer: "You can browse our 'Tuitions' page or search for tutors by subject, location, and expertise. Once you find a suitable tutor, you can view their profile and contact them or apply for their tuition posting."
    },
    {
      question: "Is there a fee to sign up as a student?",
      answer: "No, signing up as a student is completely free. You only pay for the tuition services you agree upon with the tutor."
    },
    {
      question: "How do I become a tutor on Bashar Teacher?",
      answer: "Simply create an account as a 'Tutor'. Complete your profile with your qualifications, experience, and the subjects you can teach. Once your profile is ready, you can start applying to tuition jobs."
    },
    {
      question: "How are payments handled?",
      answer: "We offer secure online payment processing through Stripe. Students can pay tutors directly through the platform, ensuring a safe and transparent transaction for both parties."
    },
    {
      question: "What if I am not satisfied with a tutor?",
      answer: "If you have any issues with a tutor, please contact our support team immediately. We will investigate the matter and help resolve the issue, which may include finding a replacement tutor or processing a refund if applicable."
    },
    {
      question: "Can I post a tuition requirement?",
      answer: "Yes! Students can post their tuition requirements detailing the subject, class, location, and budget. Tutors can then apply to your posting."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-base-content mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-base-content/70">
            Everything you need to know about Bashar Teacher.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              toggle={() => handleToggle(index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-base-content/70">
            Can't find what you're looking for?{' '}
            <a href="/contact" className="text-primary font-medium hover:underline">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
