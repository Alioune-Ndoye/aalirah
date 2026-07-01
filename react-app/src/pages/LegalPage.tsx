import PageHero from '../components/PageHero';
import Seo from '../components/Seo';
import { meta } from '../lib/seo';
import { site, mailto } from '../lib/site';

type Section = { h: string; body: string[] };

const updated = 'June 21, 2026';

const content: Record<'privacy' | 'terms', { label: string; title: string; em: string; sections: Section[] }> = {
  privacy: {
    label: 'Legal',
    title: 'Privacy',
    em: 'Policy',
    sections: [
      {
        h: 'Information We Collect',
        body: [
          `When you request a quote, book a service, send a message, or subscribe to updates, we collect the information you provide — such as your name, email, phone number, service address, and any details about your cleaning needs.`,
          `We may also collect basic, non-identifying analytics about how visitors use our website (pages viewed, device type) to improve the experience.`,
        ],
      },
      {
        h: 'How We Use It',
        body: [
          `We use your information to respond to inquiries, schedule and provide cleaning services, send service confirmations and reminders, and — only if you opt in — share occasional updates and offers.`,
          `We do not sell your personal information. We share it only with team members and trusted service providers who help us operate (for example, scheduling or email tools), and only as needed.`,
        ],
      },
      {
        h: 'Cookies & Analytics',
        body: [
          `Our website may use cookies and analytics tools to understand traffic and improve our content. You can disable cookies in your browser settings; some features may not work as well.`,
        ],
      },
      {
        h: 'Your Choices',
        body: [
          `You may request access to, correction of, or deletion of your personal information at any time, and you can unsubscribe from marketing messages using the link in any email.`,
          `To make a request, contact us at ${site.email}.`,
        ],
      },
      {
        h: 'Contact',
        body: [`Questions about this policy? Reach us at ${site.email} or ${site.phone}.`],
      },
    ],
  },
  terms: {
    label: 'Legal',
    title: 'Terms of',
    em: 'Service',
    sections: [
      {
        h: 'Using Our Website',
        body: [
          `By accessing ${site.name}'s website and services, you agree to these terms. If you do not agree, please do not use the site.`,
        ],
      },
      {
        h: 'Quotes & Bookings',
        body: [
          `Prices shown online are estimates. Final pricing is confirmed after we assess the space, and may vary based on size, condition, and scope. Submitting a booking request is not a guarantee of availability — we will confirm your appointment directly.`,
        ],
      },
      {
        h: 'Our Guarantee',
        body: [
          `We stand behind our work. If any aspect of a completed cleaning does not meet expectations, contact us within 24 hours and we will return to make it right at no additional cost, subject to reasonable scheduling.`,
        ],
      },
      {
        h: 'Cancellations',
        body: [
          `Please give us at least 24 hours' notice to reschedule or cancel an appointment so we can offer the slot to another client.`,
        ],
      },
      {
        h: 'Limitation of Liability',
        body: [
          `${site.name} is fully insured. To the extent permitted by law, our liability for any claim relating to our services is limited to the amount paid for the service in question.`,
        ],
      },
      {
        h: 'Contact',
        body: [`Questions about these terms? Reach us at ${site.email} or ${site.phone}.`],
      },
    ],
  },
};

export default function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const c = content[kind];
  return (
    <>
      <Seo {...meta[kind]} />
      <PageHero label={c.label} title={c.title} em={c.em} minH="46vh" />

      <section className="bg-ivory py-20 md:py-28">
        <div className="wrap max-w-3xl">
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            Last updated: {updated}
          </p>
          {c.sections.map((s) => (
            <div key={s.h} className="mb-10">
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.6rem',
                  color: 'var(--forest)',
                  marginBottom: 12,
                }}
              >
                {s.h}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} style={{ color: 'var(--text-soft)', lineHeight: 1.8, marginBottom: 12 }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="text-xs mt-12 p-4 rounded-xl" style={{ background: '#fff', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
            This page is a starting template and not legal advice. Please have it reviewed by a qualified attorney
            before launch. Reach us at <a href={mailto} style={{ color: 'var(--mint-dark)' }}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
