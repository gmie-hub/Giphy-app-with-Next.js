import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Giphy } from "../type";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Search(initialData: Giphy) {
    const router = useRouter();

    const metaContent = initialData?.giphys?.data?.map((each) => ' ' + each?.title).join(' ');

    return (
        <>
            <Head>
                <title>Search result for: {router.query.searchTerm}</title>
                <meta name="description" content={metaContent}></meta>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <p> Go <Link href='/'>Home</Link></p>
            <h1>Search results for: {router.query.searchTerm}</h1>
            <div className="giphy-search-results-grid">
                {initialData.giphys.data.map((each, index) => {
                    return(
                        <div key={index}>
                        <h3>{each.title}</h3>
                        <img src={each.images.original.url} alt={each.title}/>
                        </div>
                    )
                })}
            </div>
            <Footer />
        </>
    )
}

export async function getServerSideProps(context: { query: { searchTerm: string } }) {
    const searchTerm = context.query.searchTerm;
    let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=nPJNlVceWHERWCSDBW5XMo1p90l7l9ie&limit=6`);
    giphys = await giphys.json();

    return { props: { giphys: giphys }}
}