import Layout from '@/components/Layout';
import { Spinner } from '@/components/ui/spinner';

// Shown while a page's data hooks are still resolving. Wrapped in Layout so
// nav/footer stay visible instead of the page flashing fully blank —
// matches the brand's existing minimal, uncluttered style rather than
// introducing a new visual language.
export function PageLoader() {
  return (
    <Layout>
      <section className="min-h-[50vh] flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Spinner className="size-6 text-primary" />
          <span className="text-sm">Loading...</span>
        </div>
      </section>
    </Layout>
  );
}
