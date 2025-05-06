import { UploadForm } from '@/components/production-center/task-dispatch/UploadForm'
import { DownloadTemplateButton } from '@/components/production-center/task-dispatch/DownloadTemplateButton'

export default function Page() {
  return (
    <main className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">上传隧道计划 CSV</h1>
      <DownloadTemplateButton />
      <UploadForm />
    </main>
  )
}
