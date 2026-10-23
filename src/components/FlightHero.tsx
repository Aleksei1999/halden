'use client';

import { Blueprint } from '@/components/Blueprint';
import { Hero } from '@/components/blocks/Hero';
import { Button } from '@/components/ui/Button';

// клиентский: overlay — функция, её нельзя передать из серверной страницы
export function FlightHero() {
  return (
    <Hero
      variant="sequence"
      frames={{ dir: '/flight', count: 121 }}
      length={9}
      // на кадре 94 детали висят в воздухе: стоп, поверх рисуется чертёж; в конце стоит готовая башня
      keyframes={[
        [0, 0.36, 0.56, 0.7],
        [0, 94, 94, 120],
      ]}
      overlay={(p) => <Blueprint progress={p} range={[0.36, 0.56]} />}
      callouts={[
        {
          title: 'Crown terrace, level 31',
          text: 'A residents’ club and garden under the spire, open to every home in the building.',
          at: [0.5, 0.36],
          atMobile: [0.5, 0.34],
          side: 'right',
          range: [0.73, 0.79],
          hideAtMobile: 0.8,
        },
        {
          title: 'Load-bearing limestone',
          text: 'Each facade block is cut to size and laid by hand. No panels, no cladding.',
          at: [0.46, 0.66],
          atMobile: [0.47, 0.64],
          side: 'left',
          range: [0.8, 0.86],
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
  );
}
