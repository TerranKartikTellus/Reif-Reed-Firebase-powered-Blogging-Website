import Head from "next/head"

export default function HeadTag({title,description}){

          return (
                    <Head>
                      <meta charset="utf-8" />
                      <meta name="Description" CONTENT={description} />
                      <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34="/>
                      <title className="tracking-wider text-lg">{title}</title>
                      <meta name="robots" content="noindex,nofollow"></meta>
                      


                      {/* favicon generated using svg from: https://realfavicongenerator.net/ */}
                      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
                      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                      <link rel="manifest" href="/favicon/site.webmanifest" />
                      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
                      <meta name="msapplication-TileColor" content="#da532c" />
                      <meta name="theme-color" content="#ffffff"></meta>

                    </Head>
          );
} 