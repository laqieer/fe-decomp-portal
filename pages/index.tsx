import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const resp = {
  "fireemblem8": {
      "us": {
          "default": [
              {
                  "timestamp": 1680441522,
                  "git_hash": "5a7cab0f2a553fdad493517d82f8612daf4f573f",
                  "measures": {
                      "functions/unmatched": 22,
                      "functions/total": 8528,
                      "functions": 4311,
                      "data/banim": 2380160,
                      "data": 504690,
                      "data/total": 1250202,
                      "symbols/wip": 329,
                      "symbols": 23874,
                      "symbols/total": 32395,
                      "code": 381900,
                      "code/total": 858300
                  }
              },
              {
                  "timestamp": 1680365928,
                  "git_hash": "0b85e25bc0e7dfbc77a4fdfbd73f67d1de188e4d",
                  "measures": {
                      "functions/total": 8528,
                      "functions": 4311,
                      "data/banim": 2380160,
                      "data": 504690,
                      "data/total": 1250202,
                      "symbols/wip": 329,
                      "symbols": 23874,
                      "symbols/total": 32395,
                      "code": 381900,
                      "code/total": 858300
                  }
              },
              {
                  "timestamp": 1680133741,
                  "git_hash": "9a2f27a962f2cc2e3b315f44b360af645389de3e",
                  "measures": {
                      "functions/total": 8528,
                      "functions": 4296,
                      "data/banim": 2380160,
                      "data": 504539,
                      "data/total": 1250203,
                      "symbols/wip": 329,
                      "symbols": 23828,
                      "symbols/total": 32390,
                      "code": 380388,
                      "code/total": 858300
                  }
              },
              {
                  "timestamp": 1679934080,
                  "git_hash": "74fded2e809282e7da3e6c74dbba267ac6b095e7",
                  "measures": {
                      "functions/total": 8528,
                      "functions": 4262,
                      "data/banim": 2380160,
                      "data": 504539,
                      "data/total": 1250203,
                      "symbols/wip": 319,
                      "symbols": 23803,
                      "symbols/total": 32380,
                      "code": 376016,
                      "code/total": 858300
                  }
              }
          ]
      }
  }
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Fire Emblem 8 (US) Decomop Progress',
    },
  },
};

const labels = resp.fireemblem8.us.default.sort((a, b) => a.timestamp - b.timestamp).map((x) => new Date(1000 * x.timestamp).toDateString());
const functions = resp.fireemblem8.us.default.sort((a, b) => a.timestamp - b.timestamp).map((x) => 100 * x.measures.functions / x.measures['functions/total']);
const symbols = resp.fireemblem8.us.default.sort((a, b) => a.timestamp - b.timestamp).map((x) => 100 * x.measures.symbols / x.measures['symbols/total']);
const code = resp.fireemblem8.us.default.sort((a, b) => a.timestamp - b.timestamp).map((x) => 100 * x.measures.code / x.measures['code/total']);
const data = resp.fireemblem8.us.default.sort((a, b) => a.timestamp - b.timestamp).map((x) => 100 * x.measures.data / x.measures['data/total']);

export const progress = {
  labels,
  datasets: [
    {
      label: 'functions',
      data: functions,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'symbols',
      data: symbols,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'code',
      data: code,
      borderColor: 'green',
      backgroundColor: 'green',
    },
    {
      label: 'data',
      data: data,
      borderColor: 'yellow',
      backgroundColor: 'yellow',
    },
  ],
};

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
        <Line
          options={options}
          data={progress}
        />

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about Next.js features and&nbsp;API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main>
    </>
  )
}
