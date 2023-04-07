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
  Colors,
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
  Legend,
  Colors,
);

export default function Progress(props: { title: string; project: string; version: string; }) {
  const [labels, setLabels] = useState([])
  const [functions, setFunctions] = useState([])
  const [symbols, setSymbols] = useState([])
  const [code, setCode] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    fetch('https://progress.deco.mp/data/' + props.project + '/' + props.version + '/?mode=all')
      .then((res) => res.json())
      .then((data) => {
        const metrics = data[props.project][props.version].default.filter((value: any, index: any, self: any) => index === self.findIndex((t: any) => (t.git_hash === value.git_hash))).sort((a: any, b: any) => a.timestamp - b.timestamp)
        setLabels(metrics.map((x: any) => new Date(1000 * x.timestamp)))
        setFunctions(metrics.map((x: any) => x.measures.functions / x.measures['functions/total']))
        setSymbols(metrics.map((x: any) => x.measures.symbols / x.measures['symbols/total']))
        setCode(metrics.map((x: any) => x.measures.code / x.measures['code/total']))
        setData(metrics.map((x: any) => (x.measures.data + x.measures['data/banim'] ?? 0) / (x.measures['data/total'] + x.measures['data/banim'] ?? 0)))
      })
  }, [props.project, props.version])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        font: {
            size: 36
        },
        text: props.title,
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

  return (
    <>
        <Line
          options={options}
          data={{
            labels,
            datasets: [
              {
                label: 'functions',
                data: functions,
              },
              {
                label: 'symbols',
                data: symbols,
              },
              {
                label: 'code',
                data: code,
              },
              {
                label: 'data',
                data: data,
              },
            ],
          }}
        />
    </>
  )
}
