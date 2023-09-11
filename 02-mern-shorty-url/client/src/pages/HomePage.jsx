import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiLike, BiStats, FaSignInAlt, FaUserSecret, GoDeviceMobile, GrSecure, RxLinkBreak2 } from 'react-icons/all.js';
/* =============================
📦 Custom Imports
============================= */
import { UrlForm, UrlList } from '@features/url/components/index.js';
import { temporarySelector } from '@features/temporary/temporarySlice.js';

/* =============================
📦 Component - HomePage
============================= */
export default function HomePage() {
  /* =============================
  📦 Section - Hooks & Variables:
  ============================= */
  const { entries } = useSelector(temporarySelector);
  /* =============================
  📦 Section - Rendering:
  ============================= */
  return <>
    {/* Section 01 */}
    <div className='grid gap-3 px-3 place-items-center text-center pb-5'>
      <h1 className='font-bold text-xl md:text-3xl'>More than just shorter links</h1>
      <p>A simple, modern, free and privacy-friendly URL shortener.</p>
      <Link className='btn max-w-[170px]' to='/sign'>
        <FaSignInAlt />
        Get Started
      </Link>
    </div>
    {/* Section 02 - Form */}
    <UrlForm home={true} />
    {/* Section 03 - List */}
    <div className='grid gap-2 px-3 container mx-auto max-w-6xl'>
      <UrlList items={entries} home={true} />
    </div>
    {/* Section 04 */}
    <div className='grid gap-2 py-10 px-3 container mx-auto max-w-6xl'>
      <h3 className='font-bold text-lg lg:text-2xl'>Simple and fast URL shortener!</h3>
      <p>
        Shorty allows to reduce long links from Instagram, Facebook, YouTube, Twitter, Linked In and sites with
        authority on the Internet. Just paste the long URL and click the Shorten URL button. On the next screen, copy
        the
        shortened URL and share it on websites, chat and emails. After shortening the URL, check how many clicks it
        received.
      </p>
      <h3 className='font-bold text-lg lg:text-2xl'>Shorten, share and track</h3>
      <p>
        Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant messages, and
        other locations. Track statistics for your business and projects by monitoring the number of hits from your URL
        with the click counter.
      </p>
      <ul className='grid gap-2 mt-5 sm:grid-cols-2 md:grid-cols-3 md:gap-4 md:mt-10'>
        {[
          {
            title: 'Easy',
            text: 'Shorty is easy and fast, enter the long link to get your shortened link',
            icon: <BiLike size={45} />,
          },
          {
            title: 'Shortened',
            text: 'Use any link, no matter what size, Shorty always shortens',
            icon: <RxLinkBreak2 size={45} />,
          },
          {
            title: 'Secure',
            text: 'It is fast and secure, our service have HTTPS protocol and data encryption',
            icon: <FaUserSecret size={45} />,
          },
          {
            title: 'Statistics',
            text: 'Check the amount of clicks that your shortened URL received',
            icon: <BiStats size={45} />,
          },
          {
            title: 'Reliable',
            text: 'All links that try to disseminate spam, viruses and malware are deleted',
            icon: <GrSecure size={45} />,
          },
          {
            title: 'Devices',
            text: 'Compatible with smartphones, tablets and desktop',
            icon: <GoDeviceMobile size={45} />,
          },
        ].map(({ title, text, icon }) =>
          <li key={title} className='grid items-center gap-1'>
            {icon}
            <p className='font-bold'>{title}</p>
            <p>{text}</p>
          </li>,
        )}
      </ul>
    </div>
  </>;
}
