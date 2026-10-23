export type NavItem = { label: string; href: string };

export const site = {
  name: 'The Halden',
  shortName: 'Halden',
  tagline: 'Residences in stone',
  description:
    'A thirty-two storey limestone tower of 212 residences at Nine Elms, London. Concept development, first completions 2027.',
  // домен без слеша на конце: нужен для canonical, sitemap и OG
  url: 'https://aleksei1999.github.io/halden',
  locale: 'en_GB',
  lang: 'en',
  ogImage: '/og.jpg',

  contacts: {
    // номер из диапазона Ofcom для вымышленных телефонов, у концепт-сайта нет офиса продаж
    phone: '+44 20 7946 0321',
    email: 'hello@fomenko.store',
    address: 'Sales suite, Nine Elms, London SW8',
    hours: 'By appointment, Monday to Saturday',
  },

  nav: [
    { label: 'The building', href: '/#building' },
    { label: 'Residences', href: '/#residences' },
    { label: 'Timeline', href: '/#timeline' },
    { label: 'Questions', href: '/#faq' },
  ] satisfies NavItem[],

  cta: { label: 'Register interest', href: '/#contact' },

  socials: [{ label: 'Website by Fomenko', href: 'https://fomenko.store' }] satisfies NavItem[],

  legal: [{ label: 'Privacy policy', href: '/privacy/' }] satisfies NavItem[],

  forms: {
    // FormSubmit: первая заявка придёт письмом с подтверждением, после него — обычные письма.
    endpoint: 'https://formsubmit.co/ajax/hello@fomenko.store',
    subject: 'The Halden: register interest',
  },
};

export type Site = typeof site;
