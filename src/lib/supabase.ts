import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export async function paginate(
  table: string,
  page = 1,
  pageSize = 10,
  customQuery = (q: any) => q
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  // Base query
  let query = supabase.from(table).select(`id`, { count: "exact" });

  // Apply any additional filters (e.g., order, where)
  query = customQuery(query);

  // Apply pagination
  query = query.range(start, end);

  // Fetch data
  const { data, error, count } = await query;

  if (error) {
    console.error("❌ Error fetching data:", error);
    throw error;
  }

  return {
    data,
    meta: {
      currentPage: page,
      totalPages: Math.ceil((count ?? 0) / pageSize),
      totalItems: count ?? 0,
      pageSize,
      next: page * pageSize < (count ?? 0) ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
    },
  };
}
