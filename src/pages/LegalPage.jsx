import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LegalPage() {
  const location = useLocation();

  const getPageContent = () => {
    switch (location.pathname) {
      case '/privacy-policy':
        return {
          title: 'Privacy Policy',
          updated: 'November 2026',
          content: `
            Prestige Intelligence values your privacy. We collect minimal personal information strictly required to generate your commercial software licenses, process payments, and provide direct technical onboarding via WhatsApp and Email.
            
            1. Information Collection:
            We collect your full name, email address, and phone number upon checkout to generate a unique cryptographically signed license key in our MongoDB database.
            
            2. Payment Security:
            All payments are processed using industry-standard 256-bit SSL encryption. We never store credit card numbers on our servers.
            
            3. Data Retention & Third Parties:
            Your source code download tokens and license validations are securely retained in MongoDB. We never sell, rent, or trade your contact information to third parties.
          `
        };
      case '/refund-and-returns-policy':
        return {
          title: 'Refund & Returns Policy',
          updated: 'November 2026',
          content: `
            At Prestige Intelligence, we deliver 100% complete, unencrypted digital source code and SaaS platforms with full commercial rights.
            
            1. Digital Nature of Products:
            Because full unencrypted PHP/React source code archives are delivered immediately upon successful payment with complete lifetime ownership, standard physical returns do not apply.
            
            2. Technical Support Guarantee:
            If you encounter any bug, deployment hurdle, or configuration challenge, our senior technical engineering team provides free 1-on-1 assistance via WhatsApp (+91 9341630325) to ensure your platform runs successfully.
            
            3. Defect Replacement:
            If any codebase archive is corrupt or missing files, we provide immediate updated replacements and direct GitHub repository access.
          `
        };
      case '/shipping-and-cancellation':
        return {
          title: 'Shipping & Delivery Policy',
          updated: 'November 2026',
          content: `
            1. Instant Digital Delivery:
            All Prestige Intelligence software products, PHP scripts, SaaS source codes, and masterclasses are digital goods. 
            
            2. Zero Shipping Time:
            Immediately upon successful payment confirmation, your unique license key is generated in MongoDB and your download package (.ZIP archive with documentation) is made accessible instantly on the screen and via email confirmation.
            
            3. Onboarding Assistance:
            Our onboarding team will also reach out via WhatsApp with video walkthroughs and personalized deployment guidance.
          `
        };
      default:
        return {
          title: 'Terms and Conditions',
          updated: 'November 2026',
          content: `
            Welcome to Prestige Intelligence. By purchasing or using our turnkey software and source code packages, you agree to these commercial terms.
            
            1. Commercial Reseller License:
            You are granted a commercial license to rebrand, customize, host, and sell access to the platforms to unlimited clients under your own agency brand.
            
            2. No Resale of Raw Code in Marketplaces:
            You may not redistribute or resell the raw, unbranded source code zip file as a competing template pack on code marketplaces. You are authorized to sell the deployed hosted service to end clients.
            
            3. Disclaimer of Warranty:
            All software codebases are provided "as-is" with guaranteed clean unencrypted architecture and verified documentation.
          `
        };
    }
  };

  const { title, updated, content } = getPageContent();

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 py-16 px-4 sm:px-6 lg:px-8 selection:bg-cyan-500 selection:text-black">
      <div className="max-w-3xl mx-auto space-y-6">
        <Link
          to="/"
          className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Homepage</span>
        </Link>

        <div className="p-8 sm:p-10 rounded-3xl bg-[#0f172a] border border-slate-800 space-y-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <h1 className="text-3xl font-black text-white">{title}</h1>
            <p className="text-xs text-slate-500 mt-1">Prestige Intelligence Legal Framework • Last Updated: {updated}</p>
          </div>

          <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {content}
          </div>

          <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Prestige Intelligence Compliance Team</span>
            <span>WhatsApp Support: +91 9341630325</span>
          </div>
        </div>
      </div>
    </div>
  );
}

