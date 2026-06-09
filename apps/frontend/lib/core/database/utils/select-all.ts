import { assertNoError } from "@/lib/infra/repositories/base.repository";

export async function selectAll<T>(query: any): Promise<T[]> {
  const pageSize = 1000;

  let from = 0;

  const result: T[] = [];

  while (true) {
    const { data, error } = await query.range(from, from + pageSize - 1);

    assertNoError(error);

    if (!data?.length) {
      break;
    }

    result.push(...data);

    if (data.length < pageSize) {
      break;
    }

    from += pageSize;
  }

  return result;
}
