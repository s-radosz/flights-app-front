import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

// Default value for some meta data
const defaultMeta = {
  title: 'ostatnibilet.pl',
  siteName: 'ostatnibilet.pl',
  description: 'Znajdź kierunek na swoją kolejną podróż',
  // change base url of your web (without '/' at the end)
  url: 'http://ostatnibilet.pl/',
  type: 'website',
  robots: 'follow, index',
};

/**
 * Next Head component populated with necessary SEO tags and title
 * props field used:
 * - title
 * - siteName
 * - description
 * - url
 * - type
 * - robots
 * - image
 * - date
 * - author
 * - templateTitle
 * all field are optional (default value defined on defaultMeta)
 * @example
 * <SeoHead title="Page's Title" />
 */
const SeoHead = (props) => {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };

  // Use siteName if there is templateTitle
  // but show full title if there is none
  meta.title = props.templateTitle
    ? `${props.templateTitle} | ${meta.siteName}`
    : meta.title;

  return (
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      {/* eslint-disable-next-line @next/next/inline-script-id */}
      <Script strategy='lazyOnload'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process?.env?.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content={meta.robots} />
        <meta content={meta.description} name='description' />
        <meta property='og:url' content={`${meta.url}${router.asPath}`} />
        <link rel='canonical' href={`${meta.url}${router.asPath}`} />
        <link rel='icon' type='image/png' href='/assets/favicon.png' />
        {/* Open Graph */}
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content={meta.siteName} />
        <meta property='og:description' content={meta.description} />
        <meta property='og:title' content={meta.title} />
        <meta name='image' property='og:image' content={meta.image} />
        {/* Twitter */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@F2aldi' />
        <meta name='twitter:title' content={meta.title} />
        <meta name='twitter:description' content={meta.description} />
        <meta name='twitter:image' content={meta.image} />
        {meta.date && (
          <>
            <meta property='article:published_time' content={meta.date} />
            <meta
              name='publish_date'
              property='og:publish_date'
              content={meta.date}
            />
            <meta
              name='author'
              property='article:author'
              content={meta.author}
            />
          </>
        )}
        {/* Accent color on supported browser */}
        <meta name='theme-color' content='#F53838' />
      </Head>
    </>
  );
};

export default SeoHead;
