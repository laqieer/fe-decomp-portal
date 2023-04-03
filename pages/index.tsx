import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React from 'react';
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      },
    },
    y: {
      min: 0,
      max: 1,
      ticks: {
          format: {
              style: 'percent'
          }
      }
    },
  },
};

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [labels, setLabels] = useState([])
  const [functions, setFunctions] = useState([])
  const [symbols, setSymbols] = useState([])
  const [code, setCode] = useState([])
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('https://progress.deco.mp/data/fireemblem8/us/?mode=all')
      .then((res) => res.json())
      .then((data) => {
        const metrics = data.fireemblem8.us.default.filter((value: any, index: any, self: any) => index === self.findIndex((t: any) => (t.git_hash === value.git_hash))).sort((a: any, b: any) => a.timestamp - b.timestamp)
        setLabels(metrics.map((x: any) => new Date(1000 * x.timestamp)))
        setFunctions(metrics.map((x: any) => x.measures.functions / x.measures['functions/total']))
        setSymbols(metrics.map((x: any) => x.measures.symbols / x.measures['symbols/total']))
        setCode(metrics.map((x: any) => x.measures.code / x.measures['code/total']))
        setData(metrics.map((x: any) => x.measures.data / x.measures['data/total']))
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!labels) return <p>No progress data</p>

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
          data={{
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
          }}
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
