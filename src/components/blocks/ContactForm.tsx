'use client';

import Link from 'next/link';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { Checkbox, Input, Textarea } from '@/components/ui/Field';
import { mailtoHref, submitForm } from '@/lib/submit';
import { site } from '@/site.config';

type Status = 'idle' | 'sending' | 'ok' | 'error';

type Props = {
  // поле в заявке, по которому видно, откуда она: «Форма внизу», «Квиз»
  source?: string;
  submitLabel?: string;
  success?: ReactNode;
};

export function ContactForm({ source = 'Form', submitLabel = 'Send', success }: Props) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [last, setLast] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      Name: String(fd.get('name') ?? '').trim(),
      Contact: String(fd.get('contact') ?? '').trim(),
      Message: String(fd.get('message') ?? '').trim(),
      Source: source,
    };
    const next: Record<string, string> = {};
    if (!data.Name) next.name = 'What should we call you?';
    if (data.Contact.length < 5) next.contact = 'A phone number or email so we can reply';
    if (!fd.get('consent')) next.consent = 'Please agree to the privacy policy';
    setErrors(next);
    if (Object.keys(next).length) return;

    // ловушка для ботов: живой человек это поле не видит
    if (fd.get('_honey')) return setStatus('ok');

    setLast(data);
    setStatus('sending');
    setStatus(await submitForm(data));
  };

  if (status === 'ok') {
    return (
      <div role="status" className="border-t border-fg pt-6">
        {success ?? (
          <>
            <p className="text-h4 font-medium">Thank you, we have it</p>
            <p className="mt-3 text-muted">The sales suite will reply within one working day.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Input label="Name" name="name" autoComplete="name" error={errors.name} />
        <Input
          label="Phone or email"
          name="contact"
          autoComplete="tel"
          inputMode="email"
          error={errors.contact}
        />
      </div>
      <Textarea label="What are you looking for?" name="message" hint="Optional" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" />
      <div>
        <Checkbox
          name="consent"
          label={
            <>
              I agree to the{' '}
              <Link href={site.legal[0].href} className="underline underline-offset-4">
                privacy policy
              </Link>
            </>
          }
        />
        {errors.consent && <p className="mt-2 text-small text-danger">{errors.consent}</p>}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : submitLabel}
        </Button>
        {status === 'error' && (
          <p role="alert" className="text-small text-danger">
            Something went wrong.{' '}
            <a href={mailtoHref(last)} className="underline underline-offset-4">
              Email us instead
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
