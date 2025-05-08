
import {fetchTbmDatas }from '@/lib/tbm_del/data'
import React from 'react'

export default async function Page() {

    const res =await fetchTbmDatas()
    console.log("res", res)

  return (
    <div>tbmdata</div>
  )
}
