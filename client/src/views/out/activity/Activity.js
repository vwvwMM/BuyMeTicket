import React from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import PDFViewer from 'pdf-viewer-reactjs'

const Activity = () => {
  const newplugin = defaultLayoutPlugin()
  const activity = {
    title: 'activity1',
    poster: '../../../assets/images/poster1.pdf',
    image:
      'https://t.kfs.io/organization_resource_files/16736/56295/KKtix_1200-630__22%E6%AF%8D%E9%A0%81%E7%94%A8.png',
    date: '2023-10-10',
    watches: 100,
    totalTickets: 1000,
    leftTickets: 100,
    startSellTime: '2023-08-01',
    endSellTime: '2023-10-09',
    tickets: [
      {
        id: 1,
        name: '全票(A區)',
        price: 100,
      },
      {
        id: 2,
        name: '全票(B區)',
        price: 200,
      },
      {
        id: 3,
        name: '身障票(B區)',
        price: 30,
      },
    ],
    startTime: '18:00',
    endTime: '20:00',
    id: 1,
  }
  return (
    <div className="container">
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={activity.poster} plugins={{ newplugin }} />
      </Worker> */}
      <PDFViewer
        document={{
          url: activity.poster,
        }}
      />
    </div>
  )
}

export default Activity
