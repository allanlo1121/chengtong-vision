import { Toaster } from "sonner"

export default function Layout({ children }) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  )
}