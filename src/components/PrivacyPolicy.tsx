import React from "react";
import { Shield, Lock, Eye, CheckCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 space-y-4">
          <div className="flex items-center gap-3 text-violet-400">
            <Shield className="w-8 h-8" />
            <span className="text-xs font-bold tracking-widest uppercase">Security &amp; Trust</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            Privacy Policy
          </h1>
          <p className="text-zinc-500 text-sm">
            Last Updated: July 23, 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-zinc-350 leading-relaxed text-sm sm:text-base">
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              1. Introduction
            </h2>
            <p>
              At <strong>NameFuse</strong>, accessible from our platform, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by NameFuse and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
            <p>
              This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in NameFuse. This policy is not applicable to any information collected offline or via channels other than this website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              2. Consent
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              3. Information We Collect
            </h2>
            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <p>
              If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
            </p>
            <p>
              When you use our generator, we do <strong>not</strong> require or collect any of your social media passwords, personal profile statistics, or financial data. All calculations, username filtering, and styling selections happen procedurally.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              4. How We Use Your Information
            </h2>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400">
              <li>Provide, operate, and maintain our website and username generators.</li>
              <li>Improve, personalize, and expand our website features and user experience.</li>
              <li>Understand and analyze how you use our website.</li>
              <li>Develop new products, services, features, and functionality.</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website.</li>
              <li>Find and prevent fraudulent or abusive usage of our tools.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              5. Log Files
            </h2>
            <p>
              NameFuse follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services&apos; analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              6. Google DoubleClick DART Cookie &amp; Advertising
            </h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.
            </p>
            <p>
              However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL:{" "}
              <a 
                href="https://policies.google.com/technologies/ads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:underline"
              >
                https://policies.google.com/technologies/ads
              </a>
            </p>
            <p>
              Some of the advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Each of our advertising partners has their own Privacy Policy for their policies on user data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              7. Third-Party Privacy Policies
            </h2>
            <p>
              NameFuse&apos;s Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers&apos; respective websites.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              8. GDPR Data Protection Rights (Do Not Sell My Info)
            </h2>
            <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
              <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
              <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              9. Children&apos;s Information
            </h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              NameFuse does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
