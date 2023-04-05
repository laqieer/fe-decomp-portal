import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Progress from './progress'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>FE Decomp Portal</title>
        <meta name="description" content="Portal for Fire Emblem Decomp projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Progress
          title="Fire Emblem 8: The Sacred Stones (US) Decomp Progress"
          project="fireemblem8"
          version="us"
        />

        <div className={styles.grid}>
          <a
            href="https://github.com/laqieer/fe-decomp-portal"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Source <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Read source code of this website.
            </p>
          </a>

          <a
            href="https://github.com/FireEmblemUniverse/fireemblem8u"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Decomp <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Explore Fire Emblem 8 (US) Decomp project.
            </p>
          </a>

          <a
            href="https://github.com/decompals/frogress"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Frogress <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn how to build a decomp progress monitor like this.
            </p>
          </a>

          <a
            href="https://laqieer.github.io/"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              About <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about me.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
