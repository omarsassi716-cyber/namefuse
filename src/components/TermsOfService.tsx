import React from "react";
import { FileText, ShieldAlert, Scale, HelpCircle } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="space-y-8 animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-8 space-y-4">
          <div className="flex items-center gap-3 text-violet-400">
            <Scale className="w-8 h-8" />
            <span className="text-xs font-bold tracking-widest uppercase">Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            Terms of Service
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
              1. Terms
            </h2>
            <p>
              By accessing this Website, accessible from our URL, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              2. Use License
            </h2>
            <p>
              Permission is granted to temporarily download or utilize the generators on NameFuse&apos;s Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside pl-4 space-y-2 text-zinc-400">
              <li>Modify or copy the materials or generation algorithms;</li>
              <li>Use the materials for any commercial purpose or for any public display;</li>
              <li>Attempt to reverse engineer any software or scripts contained on NameFuse&apos;s Website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server.</li>
            </ul>
            <p>
              This will let NameFuse to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              3. Disclaimer
            </h2>
            <p>
              All the materials on NameFuse&apos;s Website are provided &quot;as is&quot;. NameFuse makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, NameFuse does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.
            </p>
            <p>
              NameFuse generates user handles and usernames through randomized, procedural guidelines. We cannot guarantee that any generated username is available on any particular third-party platform or that it is entirely free from trademark registration or local content moderation rules. Checking availability and legally registering any username is the sole responsibility of the user.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              4. Limitations
            </h2>
            <p>
              NameFuse or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on NameFuse&apos;s Website, even if NameFuse or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              5. Revisions and Errata
            </h2>
            <p>
              The materials appearing on NameFuse&apos;s Website may include technical, typographical, or photographic errors. NameFuse will not promise that any of the materials on this Website are accurate, complete, or current. NameFuse may change the materials contained on its Website at any time without notice. NameFuse does not make any commitment to update the materials.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              6. Links
            </h2>
            <p>
              NameFuse has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by NameFuse of the site. The use of any linked website is at the user&apos;s own risk.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              7. Site Terms of Use Modifications
            </h2>
            <p>
              NameFuse may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              8. Your Privacy
            </h2>
            <p>
              Please read our Privacy Policy to understand how we manage, respect, and guard your personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-6 w-1 rounded bg-violet-600"></span>
              9. Governing Law
            </h2>
            <p>
              Any claim related to NameFuse&apos;s Website shall be governed by the laws of our operating jurisdiction without regards to its conflict of law provisions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
