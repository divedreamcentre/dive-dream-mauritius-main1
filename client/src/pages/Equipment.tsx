import React from 'react';
import Layout from '@/components/Layout';
import { CheckCircle2, Anchor } from 'lucide-react';
import { useEquipmentPage } from '@/hooks/useEquipmentPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { PageLoader, PageError } from '@/components/common';

export default function Equipment() {
  const pageResult = useEquipmentPage();
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

      {/* Safety Standards */}
      <section className="py-24 border-b border-border">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.safetySection.eyebrow}</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">{page.safetySection.title}</h2>
              {page.safetySection.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {page.safetySection.badges.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={page.safetySection.image}
                  alt="Safety Standards"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diver Equipment */}
      <section className="py-24 border-b border-border">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative lg:order-last">
              <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={page.diverEquipmentSection.image}
                  alt="Dive Equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.diverEquipmentSection.eyebrow}</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">{page.diverEquipmentSection.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {page.diverEquipmentSection.paragraph}
              </p>
              <ul className="space-y-3">
                {page.diverEquipmentSection.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Boats & On-board Equipment */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.fleetSection.eyebrow}</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">{page.fleetSection.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {page.fleetSection.paragraph}
              </p>
              <ul className="space-y-3">
                {page.fleetSection.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Anchor className="w-4 h-4 text-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={page.fleetSection.image}
                  alt="Dive Boats"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
