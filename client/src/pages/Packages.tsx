import React from 'react';
import Layout from '@/components/Layout';
import { AlertCircle } from 'lucide-react';
import { usePackages } from '@/hooks/usePackages';
import { usePackagesPage } from '@/hooks/usePackagesPage';
import { combineAsyncStates } from '@/hooks/useAsyncData';
import { PackageCard, PageLoader, PageError } from '@/components/common';

export default function Packages() {
  const packagesResult = usePackages();
  const pageResult = usePackagesPage();
  const { data: packages } = packagesResult;
  const { data: page } = pageResult;

  const { isLoading, error } = combineAsyncStates(packagesResult, pageResult);
  if (isLoading) return <PageLoader />;
  if (error || !packages || !page) return <PageError />;

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

      {/* Packages Grid */}
      <section className="py-24">
        <div className="container max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left items-stretch">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} variant="full" />
            ))}
          </div>

          {/* Important Notice */}
          <div className="mt-16 bg-secondary border border-border rounded-xl p-6 text-left flex gap-4 items-start max-w-3xl mx-auto">
            <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-foreground">{page.notice.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {page.notice.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
