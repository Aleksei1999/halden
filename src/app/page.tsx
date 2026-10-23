import { Contact } from '@/components/blocks/Contact';
import { FAQ } from '@/components/blocks/FAQ';
import { FeatureGrid } from '@/components/blocks/FeatureGrid';
import { Footer } from '@/components/blocks/Footer';
import { Header } from '@/components/blocks/Header';
import { Hero } from '@/components/blocks/Hero';
import { MediaText } from '@/components/blocks/MediaText';
import { Pricing } from '@/components/blocks/Pricing';
import { Process } from '@/components/blocks/Process';
import { StackOverlap } from '@/components/motion/StackOverlap';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero
          variant="sequence"
          frames={{ dir: '/flight', count: 121 }}
          length={7}
          // стройка идёт до 62% прокрутки, потом готовая башня стоит, пока открываются выноски
          keyframes={[
            [0, 0.62],
            [0, 120],
          ]}
          callouts={[
            {
              title: 'Crown terrace, level 31',
              text: 'A residents’ club and garden under the spire, open to every home in the building.',
              at: [0.5, 0.36],
              atMobile: [0.5, 0.34],
              side: 'right',
              range: [0.66, 0.73],
              hideAtMobile: 0.75,
            },
            {
              title: 'Load-bearing limestone',
              text: 'Each facade block is cut to size and laid by hand. No panels, no cladding.',
              at: [0.46, 0.66],
              atMobile: [0.47, 0.64],
              side: 'left',
              range: [0.75, 0.82],
            },
          ]}
          eyebrow="Nine Elms, London SW8"
          title={
            <>
              Raised
              <br />
              stone by stone
            </>
          }
          lead="212 residences in a thirty-two storey limestone tower. Scroll to watch it rise."
          actions={
            <Button href="#contact" size="lg">
              Register interest
            </Button>
          }
        />

        <StackOverlap>
          <Container
            id="building"
            className="flex min-h-svh flex-col justify-between gap-16 py-[var(--section-y)]"
          >
            <div className="grid gap-10 md:grid-cols-12">
              <Heading size="h1" className="max-w-[14ch] md:col-span-7">
                Built to still be standing in 2126
              </Heading>
              <div className="space-y-5 text-muted md:col-span-4 md:col-start-9 md:pt-3">
                <p>
                  Most new towers are a steel frame with a skin hung on it. The Halden is built the
                  older way: a concrete core carrying walls of solid stone, set back in tiers as it
                  climbs.
                </p>
                <p>
                  That is why the windows sit deep in the wall, why the rooms stay cool in August,
                  and why the building will need its first facade repair in about a century.
                </p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-y-8 border-t border-line pt-6 md:grid-cols-4">
              {[
                ['Storeys', '32'],
                ['Residences', '212'],
                ['To the spire', '136 m'],
                ['Completion', '2027–28'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-small text-muted">{k}</dt>
                  <dd className="mt-2 font-display text-h2">{v}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </StackOverlap>

        <MediaText
          eyebrow="The facade"
          title="Stone you can put your hand on"
          media={{
            src: '/img/colonnade.webp',
            alt: 'Limestone pilasters rising along the facade during construction',
            ratio: '16/10',
          }}
        >
          <p>
            Pilasters run the full height of every tier, so the tower reads as vertical lines rather
            than stacked floors. Between them sit bronze-framed windows, recessed 60 cm into the
            wall.
          </p>
          <p>
            The stone is a pale oolitic limestone that darkens slightly with rain and dries back to
            honey within the hour.
          </p>
        </MediaText>

        <FeatureGrid
          title="In every residence"
          columns={4}
          items={[
            {
              title: 'Ceilings at 3.2 m',
              text: 'Rising to 3.6 m on the crown floors. Doors run floor to ceiling.',
            },
            {
              title: 'Winter gardens',
              text: 'Glazed loggias you can open fully in summer and close in January.',
            },
            {
              title: 'Solid oak floors',
              text: 'Laid in a herringbone pattern on acoustic screed between every floor.',
            },
            {
              title: '24-hour concierge',
              text: 'Parcel room, cold store for deliveries and a porter at the door.',
            },
          ]}
        />

        <Pricing
          id="residences"
          title="Residences"
          lead="Prices for the first release. Floor plans and the full price list are sent on request."
          tiers={[
            {
              name: 'One bedroom',
              price: 'from £895,000',
              text: 'Levels 3 to 14.',
              features: ['54 to 61 m²', 'Winter garden', 'Cellar storage'],
              cta: { label: 'Request floor plans', href: '#contact' },
            },
            {
              name: 'Two bedroom',
              price: 'from £1,450,000',
              text: 'Levels 6 to 24, most with a corner aspect.',
              features: ['88 to 104 m²', 'Two bathrooms', 'Dual-aspect living room', 'Parking available'],
              cta: { label: 'Request floor plans', href: '#contact' },
              featured: true,
            },
            {
              name: 'Crown residences',
              price: 'from £4,200,000',
              text: 'Twelve homes on levels 28 to 31.',
              features: ['180 to 310 m²', 'Private terrace', 'Private lift lobby', 'Two parking spaces'],
              cta: { label: 'Book a private viewing', href: '#contact' },
            },
          ]}
          note="Prices are indicative and correct for the first release. Service charge estimates are included in the price list."
        />

        <MediaText
          theme="dark"
          reverse
          eyebrow="The crown"
          title="A garden thirty-one floors up"
          media={{
            src: '/img/tower.webp',
            alt: 'The finished tower with its spire above the city under a summer sky',
            ratio: '16/10',
          }}
        >
          <p>
            The top tier is given to the building, not sold. It holds a residents’ club, a library
            with a fireplace and a planted terrace on all four sides.
          </p>
          <p>Book it for dinner, or come up at 7 am when it is empty and the river is still grey.</p>
        </MediaText>

        <Process
          id="timeline"
          theme="light"
          title="Where the build is"
          steps={[
            {
              when: 'Spring 2025',
              title: 'Groundworks',
              text: 'Piling and basement complete, core started.',
            },
            {
              when: 'Autumn 2026',
              title: 'Topped out',
              text: 'The spire went up in September. Stone is now laid to level 24.',
            },
            {
              when: 'Summer 2027',
              title: 'First completions',
              text: 'Levels 3 to 14 handed over, with the garden and concierge open.',
            },
            {
              when: 'Spring 2028',
              title: 'The crown',
              text: 'Crown residences and the residents’ club complete.',
            },
          ]}
        />

        <FAQ
          id="faq"
          title="Questions"
          aside="Anything not covered here, the sales suite will answer within one working day."
          items={[
            {
              q: 'How much is the deposit?',
              a: '10% on exchange, a further 10% twelve months later and the balance on completion.',
            },
            {
              q: 'Can overseas buyers purchase?',
              a: 'Yes. We will need proof of funds and identity documents for anti-money-laundering checks.',
            },
            {
              q: 'What is the lease?',
              a: '999 years, with a share of the freehold held by the residents’ management company.',
            },
            {
              q: 'Is parking included?',
              a: 'Two spaces come with each crown residence. Spaces for other homes are sold separately.',
            },
          ]}
        />

        <Contact
          title="Register your interest"
          lead="Leave your details and we will send floor plans and the price list, then arrange a viewing at the sales suite."
        />
      </main>
      <Footer />
    </>
  );
}
