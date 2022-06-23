import Head from "next/head"

export default function HeadTag({
   title = 'Rief Reed',
   cardTitle = 'Rief Reed',
   description = 'All your favourite reads only on Rief Reed',
  image = '',
}){

          return (
                    <Head>
                      <meta charset="utf-8" />
                      <meta name="Description" CONTENT={description} />
                      <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34="/>
                      <title className="tracking-wider text-lg">{title}</title>
                      <meta name="robots" content="noindex,nofollow"></meta>
                      


                      <meta name="twitter:card" content="summary" />
                      <meta name="twitter:site" content="reifreed.vercel.app" />
                      <meta name="twitter:title" content={cardTitle} />
                      <meta name="twitter:description" content={description} />
                      <meta name="twitter:image" content={image} />

                      <meta property="og:title" content={cardTitle} />
                      <meta property="og:description" content={description} />
                      <meta property="og:image" content={image} />
                      
                    </Head>
          );
} 