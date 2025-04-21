
import {fetchTbmDatas }from '@/lib/tbm/tbm-data'
import React from 'react'

export default async function Page() {

    const res =await fetchTbmDatas()
    console.log("res", res)

  return (
    <div>tbmdata</div>
  )
}
