import React, { useState } from "react";

const TermsAndConditions = () => {
  const [content] = useState(`<ul>
  <li><strong>Terms and Conditions</strong></li>
  <li>By accessing or using this website/application, you agree to comply with and be bound by these terms.</li>
  <li>You are responsible for maintaining the confidentiality of your account and for all activities that occur under it.</li>
  <li>You agree not to misuse the service, attempt unauthorized access, or engage in any activity that disrupts or harms the platform.</li>
  <li>All content and services are provided “as is” without warranties of any kind. We do not guarantee uninterrupted or error-free operation.</li>
  <li>We reserve the right to modify, suspend, or terminate the service at any time without prior notice.</li>
  <li>We are not liable for any direct or indirect damages arising from the use or inability to use the service.</li>
  <li>These terms may be updated periodically. Continued use of the service constitutes acceptance of the revised terms.</li>
</ul>
`);

  return (
    <div className="flex flex-col gap-6">
      <div className="prose prose-sm max-w-none bg-white p-6 rounded-2xl outline outline-1 outline-offset-[-1px] outline-black/10 relative">
        <div
          className="text-gray-700 leading-relaxed max-w-[1440px]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default TermsAndConditions;
