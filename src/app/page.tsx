import { getProducts, getPageConfig } from '@/lib/db';
import { getHeroSlides } from '@/lib/hero';
import { PageRenderer } from '@/components/builder/PageRenderer';

export default async function Home() {
  const products = await getProducts();
  const pageConfig = await getPageConfig('home');
  const heroSlides = await getHeroSlides();

  if (!pageConfig) {
    return <div>Home page configuration not found. Please create a page with slug 'home'.</div>;
  }

  return (
    <PageRenderer sections={pageConfig.sections} products={products} heroSlides={heroSlides} />
  );
}
