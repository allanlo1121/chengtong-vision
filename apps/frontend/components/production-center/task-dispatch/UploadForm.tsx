'use client'

import { useState } from 'react'
import Papa from 'papaparse'
import { confirmUploadCsvAction } from '@/lib/production-center/progress/actions'

export function UploadForm() {
  const [parsedData, setParsedData] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handlePreview = async () => {
    if (!file) return

    const text = await file.text()
    const result = Papa.parse(text, { header: true, skipEmptyLines: true })
    setParsedData(result.data)
    setMessage('')
  }

  const handleSubmit = async () => {
    const result = await confirmUploadCsvAction(parsedData)
    setMessage(result.message)
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          setFile(e.target.files?.[0] || null)
          setParsedData([])
        }}
      />
      <button onClick={handlePreview} className="bg-blue-600 text-white px-4 py-2 rounded">
        预览数据
      </button>

      {parsedData.length > 0 && (
        <>
          <table className="w-full border text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">tunnel_id</th>
                <th className="border px-2 py-1">plan_at</th>
                <th className="border px-2 py-1">plan_ring_count</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.slice(0, 10).map((row, index) => (
                <tr key={index}>
                  <td className="border px-2 py-1">{row.tunnel_id}</td>
                  <td className="border px-2 py-1">{row.plan_at}</td>
                  <td className="border px-2 py-1">{row.plan_ring_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-gray-500">仅预览前 10 行</p>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            确认导入 {parsedData.length} 条记录
          </button>
        </>
      )}

      {message && <p className="text-sm text-green-700">{message}</p>}
    </div>
  )
}
