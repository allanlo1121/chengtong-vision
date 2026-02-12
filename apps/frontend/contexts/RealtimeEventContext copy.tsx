// 'use client'

// import {
//     createContext,
//     useContext,
//     useEffect,
//     useRef,
//     useState,
//     ReactNode,
// } from 'react'
// import { createClient } from '@frontend/lib/supabase/client'
// import type { RealtimeEvent } from '@frontend/types/realtime/realtime-events'
// import { useDebouncedEventEmitter } from './useDebouncedEventEmitter.ts'

// type RealtimeEventContextValue = {
//     lastEvent?: RealtimeEvent
// }

// const RealtimeEventContext =
//     createContext<RealtimeEventContextValue>({})

// export function useRealtimeEvent() {
//     return useContext(RealtimeEventContext)
// }

// export function RealtimeEventProvider({
//     children,
// }: {
//     children: ReactNode
// }) {
//      const supabase = createClient()
//     const [lastEvent, setLastEvent] = useState<RealtimeEvent>()
//     const lastEventRef = useRef<RealtimeEvent | undefined>(undefined)

//     const emitEvent = (event: RealtimeEvent) => {
//         setLastEvent(event)
//     }

//     const { emitDebounced } =
//         useDebouncedEventEmitter<RealtimeEvent>(emitEvent, 300)

//     /** 防止同一事件在短时间内重复触发 */
//     // const emit = (event: RealtimeEvent) => {
//     //     if (lastEventRef.current === event) return
//     //     lastEventRef.current = event
//     //     setLastEvent(event)
//     // }

//     useEffect(() => {
//         const channel = supabase.channel('realtime-event-bus')

//         /** tunnels */
//         channel.on(
//             'postgres_changes',
//             { event: '*', schema: 'public', table: 'tunnels' },
//             () => emitDebounced('tunnels_changed')
//         )

//         /** TBM 在线状态 */
//         channel.on(
//             'postgres_changes',
//             {
//                 event: '*',
//                 schema: 'public',
//                 table: 'tbm_active_connectivity_snapshots',
//             },
//             (payload) => {
//                 const oldRow = payload.old as any | null
//                 const newRow = payload.new as any | null

//                 // 1️⃣ INSERT：新状态段开始
//                 if (!oldRow && newRow) {
//                     emitDebounced('tbm_connectivity_changed')
//                     return
//                 }

//                 // 2️⃣ UPDATE：状态字段发生变化
//                 if (oldRow && newRow) {
//                     const plcChanged =
//                         oldRow.plc_online !== newRow.plc_online

//                     const networkChanged =
//                         oldRow.network_online !== newRow.network_online

//                     // 状态段结束（end_at 从 null → 有值）
//                     // const segmentEnded =
//                     //     oldRow.end_at === null && newRow.end_at !== null

//                     if (plcChanged || networkChanged) {
//                         emitDebounced('tbm_connectivity_changed')
//                         return
//                     }
//                 }

//                 // 3️⃣ DELETE（理论上很少，但兜底）
//                 if (oldRow && !newRow) {
//                     emitDebounced('tbm_connectivity_changed')
//                 }
//             }
//         )

//         /** TBM 分配 */
//         channel.on(
//             'postgres_changes',
//             {
//                 event: '*',
//                 schema: 'public',
//                 table: 'tbm_assignments',
//             },
//             () => emitDebounced('tbm_assignment_changed')
//         )

//         channel.subscribe()

//         return () => {
//             supabase.removeChannel(channel)
//         }
//     }, [])

//     return (
//         <RealtimeEventContext.Provider value={{ lastEvent }}>
//             {children}
//         </RealtimeEventContext.Provider>
//     )
// }
