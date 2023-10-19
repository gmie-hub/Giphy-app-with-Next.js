import Head from "next/head";
import Link from "next/link"

const Footer = () => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/styles.css"/>
            </Head>
            <div className="footer">
                <p><Link href="/">home</Link></p>
                <p><Link href="/about">about</Link></p>
                <p>A big thanks to <a href="https://giphy.com/">giphy.com</a> for letting us use there API!</p>
            </div>
        </>
    )
};

export default Footer;