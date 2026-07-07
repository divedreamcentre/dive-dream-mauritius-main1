import Layout from '@/components/Layout';
import { Shield, CheckCircle2, Award, HelpCircle, Repeat } from 'lucide-react';
import { Link } from 'wouter';
import { useDivingPage } from '@/hooks/useDivingPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { getIcon, PageLoader, PageError } from '@/components/common';

export default function Diving() {
  const pageResult = useDivingPage();
  const { data: page } = pageResult;

  const { isLoading, error } = combineAsyncStates(pageResult);
  if (isLoading) return <PageLoader />;
  if (error || !page) return <PageError />;

  return (
    <Layout>
      {/* Header */}
      <section className="relative py-24 border-b border-border">
        <div className="container text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.hero.eyebrow}</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mt-2 mb-4">{page.hero.title}</h1>
          <p className="text-muted-foreground">
            {page.hero.description}
          </p>
        </div>
      </section>

      {/* Nitrox Section */}
      <section id="nitrox" className="py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.nitroxSection.eyebrow}</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">{page.nitroxSection.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {page.nitroxSection.description}
              </p>

              <ul className="space-y-3.5 text-sm text-muted-foreground">
                {page.nitroxSection.points.map((point) => (
                  <li key={point} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-primary shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex gap-4">
                <Link href="/reservations?course=nitrox" className="btn-premium-primary text-sm">
                  {page.nitroxSection.ctaLabel}
                </Link>
              </div>
            </div>

            <div className="glass-panel p-8 space-y-6 text-left border-primary/20 bg-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground">{page.nitroxSection.highlightCard.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {page.nitroxSection.highlightCard.description}
              </p>

              <div className="border-t border-border pt-4 space-y-3 text-xs text-foreground/80 font-semibold">
                {page.nitroxSection.highlightCard.notes.map((note) => (
                  <div key={note} className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rebreather Diving Section */}
      <section id="rebreather" className="py-24 bg-secondary/40">
        <div className="container max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.rebreatherSection.eyebrow}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2 mb-4">{page.rebreatherSection.title}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {page.rebreatherSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* What is a Rebreather */}
            <div className="glass-panel p-8 space-y-6 text-left border-primary/20 bg-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Repeat className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground">{page.rebreatherSection.whatIsIt.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {page.rebreatherSection.whatIsIt.description}
              </p>

              <div className="border-t border-border pt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">Benefits of Rebreather Diving</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {page.rebreatherSection.whatIsIt.benefits.map((benefit) => {
                    const Icon = getIcon(benefit.icon);
                    return (
                      <li key={benefit.id} className="flex items-center gap-2.5">
                        <Icon className="w-4.5 h-4.5 text-primary shrink-0" />
                        <span>{benefit.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Ideal For */}
            <div className="space-y-6">
              <div className="glass-panel p-8 space-y-6 text-left">
                <h3 className="text-xl font-serif font-bold text-foreground">{page.rebreatherSection.idealFor.title}</h3>
                <ul className="space-y-4">
                  {page.rebreatherSection.idealFor.items.map((item) => {
                    const Icon = getIcon(item.icon);
                    return (
                      <li key={item.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <span>{item.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="glass-panel p-6 text-left border-gold/20 bg-gold/5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {page.rebreatherSection.enquiry.description}
                </p>
                <div className="pt-4">
                  <Link href="/contact" className="btn-premium-primary text-sm">
                    {page.rebreatherSection.enquiry.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nitrox FAQ */}
      <section className="py-24">
        <div className="container max-w-4xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Knowledge Base</span>
          <h2 className="text-3xl font-serif font-bold text-foreground mt-2 mb-12">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {page.nitroxFaqs.map((faq) => (
              <div key={faq.question} className="glass-panel p-6 space-y-3">
                <h3 className="text-base font-serif font-bold text-foreground flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" /> {faq.question}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
