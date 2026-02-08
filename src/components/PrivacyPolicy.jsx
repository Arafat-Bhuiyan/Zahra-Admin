import { useState } from "react";

const PrivacyPolicy = () => {
  const [content] = useState(`<ul>
  <li><strong>Privacy Policy</strong></li>
  <li>We collect only the information necessary to provide and improve our services, such as name, email address, and usage data.</li>
  <li>Your data is used solely for service functionality, communication, and security purposes. We do not sell or rent personal information to third parties.</li>
  <li>We may share data with trusted service providers strictly for operational needs and only under confidentiality obligations.</li>
  <li>Reasonable technical and organizational measures are taken to protect your information from unauthorized access or misuse.</li>
  <li>By using our services, you agree to this privacy policy. Changes may be made periodically and will be updated on this page.</li>
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

export default PrivacyPolicy;
