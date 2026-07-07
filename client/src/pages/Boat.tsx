import React from 'react';
import Layout from '@/components/Layout';
import { CheckCircle2 } from 'lucide-react';
import { useBoatPage } from '@/hooks/useBoatPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { getIcon, PageLoader, PageError } from '@/components/common';

export default function Boat() {
  const pageResult = useBoatPage();
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

      {/* Main Boat Details */}
      <section className="py-20">
        <div className="container max-w-5xl space-y-24">
          {/* Section 1: Visual Showcase & Specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-2xl">
                <img
                  src={page.vesselImage}
                  alt="MV Ocean Explorer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">{page.specsSection.eyebrow}</span>
              <h2 className="text-3xl font-serif font-bold text-foreground">{page.specsSection.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {page.specsSection.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-secondary/60 border border-border p-5 rounded-xl">
                {page.specsSection.specs.map((spec) => (
                  <div key={spec.label}>
                    <span className="block text-muted-foreground">{spec.label}</span>
                    <span className="block text-sm font-bold text-foreground mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {page.featureCards.map((card) => {
              const Icon = getIcon(card.icon);
              const isEmergency = card.id === 'emergency-systems';
              return (
                <div
                  key={card.id}
                  className={`glass-panel p-8 space-y-4 ${isEmergency ? 'border-emerald-500/10 bg-emerald-500/5' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isEmergency ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-primary/10 border border-primary/20'
                  }`}>
                    <Icon className={`w-6 h-6 ${isEmergency ? 'text-emerald-400' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-foreground">{card.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${isEmergency ? 'text-emerald-400' : 'text-primary'}`} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
