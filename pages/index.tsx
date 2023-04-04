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
      type: 'time' as const,
      time: {
        unit: 'month' as const,
      },
    },
    y: {
      min: 0,
      max: 1,
      ticks: {
          format: {
              style: 'percent',
          },
      },
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
        setData(metrics.map((x: any) => (x.measures.data + x.measures['data/banim']) / (x.measures['data/total'] + x.measures['data/banim'])))
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
