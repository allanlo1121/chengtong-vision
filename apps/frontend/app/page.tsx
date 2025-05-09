import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="mx-auto dark:invert"
          src="/logo.svg"
          alt="CREC logo"
          width={100}
          height={100}
          priority
        />
        <div className="flex flex-col gap-[16px] items-center sm:items-start">
          <Link href={"/dashboard"}>
          <h1 className="text-4xl font-bold tracking-tight text-center sm:text-left">
            中铁二局城通盾构指挥中心
          </h1>
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        中铁二局集团有限公司城通分公司
      </footer>
    </div>
  );
}
