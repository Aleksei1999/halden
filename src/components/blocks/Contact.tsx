import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/site.config';
import { ContactForm } from './ContactForm';

type Props = {
  id?: string;
  title: ReactNode;
  lead?: ReactNode;
  // вместо формы можно передать <Quiz />
  children?: ReactNode;
  theme?: 'light' | 'dark';
};

const tel = (phone: string) => `tel:${phone.replace(/[^+\d]/g, '')}`;

export function Contact({ id = 'contact', title, lead, children, theme }: Props) {
  const { phone, email, address, hours } = site.contacts;
  return (
    <Section id={id} theme={theme}>
      <Container className="grid gap-14 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Heading>{title}</Heading>
          {lead && <p className="mt-6 max-w-[42ch] text-muted">{lead}</p>}
          <dl className="mt-10 grid gap-5 text-small">
            <div>
              <dt className="text-muted">Phone</dt>
              <dd className="mt-1 text-h4">
                <a href={tel(phone)}>{phone}</a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="mt-1 text-h4">
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Address</dt>
              <dd className="mt-1">
                {address}
                <span className="block text-muted">{hours}</span>
              </dd>
            </div>
          </dl>
        </div>
        <div className="md:col-span-6 md:col-start-7">{children ?? <ContactForm />}</div>
      </Container>
    </Section>
  );
}
