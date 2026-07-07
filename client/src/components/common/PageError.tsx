import Layout from '@/components/Layout';
import { AlertCircle } from 'lucide-react';

// Shown when a page's data hooks fail outright (both the real Strapi
// request and the local content fallback failed — expected to be rare in
// practice, since local content always exists). Styled after the existing
// NotFound.tsx pattern (glass-panel card, AlertCircle icon) rather than
// inventing a new error visual language.
export function PageError() {
  return (
    <Layout>
      <section className="min-h-[50vh] w-full flex items-center justify-center py-24">
        <div className="glass-panel w-full max-w-lg mx-4 p-8 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full animate-pulse" />
              <AlertCircle className="relative h-16 w-16 text-destructive" />
            </div>
          </div>
          <h2 className="text-xl font-serif font-bold text-foreground mb-2">Something Went Wrong</h2>
          <p className="text-muted-foreground leading-relaxed">
            We couldn't load this page's content. Please try refreshing, or check back shortly.
          </p>
        </div>
      </section>
    </Layout>
  );
}
