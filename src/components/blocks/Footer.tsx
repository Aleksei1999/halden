import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { site } from '@/site.config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer data-theme="dark" className="bg-bg pb-8 pt-16 text-fg md:pt-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-h2">{site.name}</p>
            <p className="mt-4 max-w-[36ch] text-small text-muted">{site.description}</p>
          </div>
          <nav aria-label="Sections" className="md:col-span-3 md:col-start-7">
            <ul className="space-y-2 text-small">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-fg/75 hover:text-fg">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-2 text-small md:col-span-3">
            <a className="block" href={`mailto:${site.contacts.email}`}>
              {site.contacts.email}
            </a>
            <a className="block" href={`tel:${site.contacts.phone.replace(/[^+\d]/g, '')}`}>
              {site.contacts.phone}
            </a>
            <ul className="flex flex-wrap gap-x-5 gap-y-2 pt-4">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg/75 hover:text-fg"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 text-small text-muted md:flex-row md:justify-between">
          <span>
            © {year} {site.name}. Concept development.
          </span>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
