import ProductDetail from '../../../../src/views/ProductDetail/ProductDetail.jsx'
import JsonLd from '../../../../src/components/JsonLd'
import { serverFetch } from '../../../../src/utils/api/serverApi'

const SITE_URL = 'https://aniroz.ir';
const PRICE_VALID_UNTIL = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

export const revalidate = 40;

export async function generateStaticParams() {
  try {
    const json = await serverFetch('products?per_page=100');
    return (json?.data || []).map((p) => ({
      id: String(p.id),
      slug: p.slug || 'product',
    }));
  } catch {
    return [];
  }
}

async function fetchProductForServer(id) {
  try {
    const json = await serverFetch(`products/${id}`);
    const data = json?.data;
    if (!data) return null;
    return {
      id: data.id,
      name: data.title,
      slug: data.slug,
      price: Number(data.price) || 0,
      salePrice: data.price_discounted ? Number(data.price_discounted) : null,
      stock: data.stock,
      image: data.primary_image || '',
      description: data.description || '',
      shortDescription: data.mini_description || '',
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id, slug } = await params;
  const product = await fetchProductForServer(id);

  if (!product) {
    return {
      title: "محصول | آنی روز",
      description: "محصول مورد نظر یافت نشد",
    };
  }

  const title = `${product.name} | آنی روز`;
  const description = product.shortDescription || product.description || product.name;
  const canonical = `${SITE_URL}/product/${id}/${product.slug || slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      siteName: 'آنی روز',
      locale: 'fa_IR',
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [{ url: product.image, alt: product.name }] : [],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export default async function ProductPage({ params }) {
  const { id, slug } = await params;
  const product = await fetchProductForServer(id);

  const productJsonLd = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.shortDescription || product.description || product.name,
        image: product.image || undefined,
        sku: String(product.id),
        mpn: String(product.id),
        brand: { '@type': 'Brand', name: 'آنی روز' },
        category: 'محصولات طبیعی',
        offers: {
          '@type': 'Offer',
          price: product.salePrice ? String(product.salePrice) : String(product.price),
          priceCurrency: 'IRR',
          url: `${SITE_URL}/product/${id}/${product.slug || slug}`,
          priceValidUntil: PRICE_VALID_UNTIL,
          availability: product.stock > 0
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@type': 'Organization', name: 'آنی روز' },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: {
              '@type': 'MonetaryAmount',
              value: '0',
              currency: 'IRR',
            },
            shippingDestination: {
              '@type': 'DefinedRegion',
              addressCountry: 'IR',
            },
          },
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'IR',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 7,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/FreeReturn',
          },
        },
        additionalProperty: {
          '@type': 'PropertyValue',
          name: 'وضعیت',
          value: product.stock > 0 ? 'موجود' : 'ناموجود',
        },
      }
    : null;

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: product ? product.name : 'محصول',
    url: `${SITE_URL}/product/${id}/${slug}`,
    inLanguage: 'fa-IR',
    isPartOf: { '@id': 'https://aniroz.ir/#website' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'خانه', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'فروشگاه', item: `${SITE_URL}/shop` },
      { '@type': 'ListItem', position: 3, name: product ? product.name : 'محصول', item: `${SITE_URL}/product/${id}/${slug}` },
    ],
  };

  return (
    <>
      {productJsonLd && <JsonLd data={productJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <ProductDetail id={id} slug={slug} />
    </>
  );
}
