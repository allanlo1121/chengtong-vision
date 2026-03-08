// import { useEffect, useState } from "react"
// import { getMasterOptions } from "@/modules/master-data/services/master-option.service"

// export function useMasterOptions(code: string) {

//     const [options, setOptions] = useState([])

//     useEffect(() => {

//         async function load() {
//             const res = await getMasterOptions(code)
//             if (res.success) {
//                 setOptions(res.data)
//             }
//         }

//         load()

//     }, [code])

//     return options
// }
