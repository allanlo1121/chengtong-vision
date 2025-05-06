'use client'

export function DownloadTemplateButton() {
  const handleDownload = () => {
    const csvContent =
      'tunnel_id,plan_at,plan_ring_count\n' +
      '00000000-0000-0000-0000-000000000000,2025-05-01T00:00:00+08:00,10\n' +
      '00000000-0000-0000-0000-000000000000,2025-05-02T00:00:00+08:00,10\n'

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'tunnel_daily_plan_template.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="bg-gray-600 text-white px-4 py-2 rounded"
    >
      下载模板 CSV
    </button>
  )
}
