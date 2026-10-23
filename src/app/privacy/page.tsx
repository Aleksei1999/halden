import type { Metadata } from 'next';
import { LegalPage } from '@/components/blocks/LegalPage';
import { site } from '@/site.config';

export const metadata: Metadata = { title: 'Privacy policy' };

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" updated="23 October 2026">
      <p>
        This policy explains how {site.name} handles personal data from visitors to{' '}
        {site.url.replace(/^https?:\/\//, '')}.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>the name and contact details you enter in the enquiry form;</li>
        <li>technical data about the visit: page address, browser type and time of visit.</li>
      </ul>
      <h2>Why</h2>
      <p>
        To reply to your enquiry and send the information you asked for. We do not send marketing
        without your consent, and we keep enquiries for no longer than 24 months.
      </p>
      <h2>Your rights</h2>
      <p>
        Under UK GDPR you can ask to see, correct or delete your data at any time. Write to{' '}
        {site.contacts.email} and we will reply within one month.
      </p>
    </LegalPage>
  );
}
