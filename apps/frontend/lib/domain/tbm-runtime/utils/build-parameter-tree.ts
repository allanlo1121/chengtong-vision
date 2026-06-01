// import { ParameterTreeGroup, RuntimeParameter } from "../types";

// export function buildParameterTree(
//     parameters: RuntimeParameter[]
// ): ParameterTreeGroup[] {
//     const map = new Map<number, ParameterTreeGroup>();

//     for (const item of parameters) {
//         if (!map.has(item.subsystem_id)) {
//             map.set(item.subsystem_id, {
//                 subsystemId: item.subsystem_id,
//                 subsystemName: item.subsystem_name,
//                 parameters: [],
//             });
//         }

//         map.get(item.subsystem_id)!.parameters.push(item);
//     }

//     return Array.from(map.values());
// }
