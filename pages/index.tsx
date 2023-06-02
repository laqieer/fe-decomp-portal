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
        <Progress
          title="Fire Emblem 6: Fūin no Tsurugi (JP) Decomp Progress"
          project="fireemblem6"
          version="jp"
        />
        <Progress
          title="Fire Emblem 7: Rekka no Ken (JP) Decomp Progress"
          project="fireemblem7j"
          version="jp"
        />

        <div className={styles.grid}>
          <a
            href="https://github.com/laqieer/fe-decomp-portal"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Source Code <span>-&gt;</span>
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
              FE8U <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Explore Fire Emblem 8 (US) Decomp project.
            </p>
          </a>

          <a
            href="https://github.com/StanHash/fe6"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              FE6 <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Explore Fire Emblem 6 (JP) Decomp project.
            </p>
          </a>

          <a
            href="https://github.com/MokhaLeee/FireEmblem7J"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              FE7J <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Explore Fire Emblem 7 (JP) Decomp project.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
