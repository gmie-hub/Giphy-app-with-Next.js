import Head from 'next/head'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Footer from './components/Footer';
import Image from 'next/image';

interface Giphy {
  catGiphys: GiphyPayload
}

interface GiphyPayload {
  data: GiphyData[];
  pagination: Pagination;
  meta: Meta;
}

interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

interface GiphyData {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user?: User;
  analytics_response_payload: string;
  analytics: Analytics;
}

interface Analytics {
  onload: Onload;
  onclick: Onload;
  onsent: Onload;
}

interface Onload {
  url: string;
}

interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

interface Images {
  original: Original;
  downsized: Downsized;
  downsized_large: Downsized;
  downsized_medium: Downsized;
  downsized_small: Downsizedsmall;
  downsized_still: Downsized;
  fixed_height: Fixedheight;
  fixed_height_downsampled: Fixedheightdownsampled;
  fixed_height_small: Fixedheight;
  fixed_height_small_still: Downsized;
  fixed_height_still: Downsized;
  fixed_width: Fixedheight;
  fixed_width_downsampled: Fixedheightdownsampled;
  fixed_width_small: Fixedheight;
  fixed_width_small_still: Downsized;
  fixed_width_still: Downsized;
  looping: Looping;
  original_still: Downsized;
  original_mp4: Downsizedsmall;
  preview: Downsizedsmall;
  preview_gif: Downsized;
  preview_webp: Downsized;
  '480w_still': Downsized;
  hd?: Downsizedsmall;
}

interface Looping {
  mp4_size: string;
  mp4: string;
}

interface Fixedheightdownsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}

interface Fixedheight {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

interface Downsizedsmall {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

interface Downsized {
  height: string;
  width: string;
  size: string;
  url: string;
}

interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}

interface FormData {
  searchTerm: string;
}

export default function Home(initialData: Giphy) {
  const [formInputs, setFormInputs] = useState<FormData>({searchTerm: ''});
  const [searchTerm, setSearchTerm] = useState('Cats');
  const [searchResults, setSearchResults] = useState([] as GiphyData[]);

  useEffect(() => {
    setSearchResults(initialData.catGiphys.data);
  }, [initialData]);

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setFormInputs({...formInputs, [name]: value});
  }

  const search = async (e: React.FormEvent) => {
    e.preventDefault();

    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${formInputs?.searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`);
    const giphyData: GiphyPayload = await giphys.json();
    setSearchResults(giphyData?.data);
    setSearchTerm(formInputs?.searchTerm);
  }
  
  return (
    <div className='container'>
      <Head>
        <title>Giphy Search App</title>
        <meta name="description" content="Love giphys? We do too. Use our advanced giphy search to find the perfect giphy for any occasion"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css"/>
      </Head>

      <h1>Jimmy Search App</h1>

      <div className='logo-container'>
        <Image src='/logo.png' alt='logo' width='500' height={200} />
      </div>

      <form onSubmit={search}>
        <input name='searchTerm' type='text' onChange={handleInputs} required />
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <p>
        Share this search with others: 
        <Link
          href="/search/[pid]"
          as={`/search/${searchTerm}`}
        >
          {`http://localhost:3000/search/${searchTerm}`}
        </Link>
      </p>

      <div className='giphy-search-results-grid'>
      {
        searchResults?.map((each: GiphyData, index) => {
          return(
            <div key={index}>
              <h3>{each?.title}</h3>
              <img src={each?.images?.original?.url} />
            </div>
          )
        })
      }
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {

  let catGiphys = await fetch('https://api.giphy.com/v1/gifs/search?q=cats&api_key=k2JEjvT4FmAR7NLDBGscM32dnrRILUDU&limit=10');
  catGiphys = await catGiphys.json();

  return { props: {catGiphys: catGiphys}}
}