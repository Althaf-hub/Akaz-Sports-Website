import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getRelatedProducts } from "@/lib/api";
import { ProductDetail } from "@/components/product/product-detail";
import { SITE_URL } from "@/lib/site";

interface ProductDetailPageProps { params: Promise<{ slug: string }>; }

function textFromHtml(value: string) { return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found", robots: { index: false, follow: false } };
  const description = textFromHtml(product.short_description || product.description).slice(0, 160) || `Explore ${product.name} at Akaz Sports Hub.`;
  const image = product.images[0]?.src;
  const canonical = `/products/${product.slug}`;
  return { title: product.name, description, alternates: { canonical }, openGraph: { type: "website", url: canonical, title: product.name, description, images: image ? [{ url: image, alt: product.images[0]?.alt || product.name }] : [] }, twitter: { card: "summary_large_image", title: product.name, description, images: image ? [image] : [] } };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = product.categories[0] ? await getRelatedProducts(product.categories[0].id, product.id) : [];
  const description = textFromHtml(product.short_description || product.description);
  const minorUnit = product.prices.currency_minor_unit ?? 2;
  const amount = Number.parseInt(product.on_sale ? product.prices.sale_price : product.prices.price, 10) / Math.pow(10, minorUnit);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: description || undefined,
    image: product.images.map((image) => image.src),
    sku: product.sku || undefined,
    brand: product.brands[0] ? { "@type": "Brand", name: product.brands[0].name } : undefined,
    offers: Number.isFinite(amount) && amount > 0
      ? {
          "@type": "Offer",
          priceCurrency: product.prices.currency_code,
          price: amount,
          availability: product.is_in_stock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          // Must be absolute URL for Google structured data validation
          url: `${SITE_URL}/products/${product.slug}`,
        }
      : undefined,
  };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }} /><ProductDetail product={product} related={related} /></>;
}
