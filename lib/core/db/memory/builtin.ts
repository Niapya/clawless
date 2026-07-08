import { getDb, schema } from '@/lib/core/db';
import type { BuiltinMemoryKey } from '@/types/memory';
import { eq } from 'drizzle-orm';

export async function getBuiltinMemoryRow(key: BuiltinMemoryKey) {
  const [row] = await getDb()
    .select()
    .from(schema.builtinMemories)
    .where(eq(schema.builtinMemories.key, key))
    .limit(1);

  return row ?? null;
}

export async function listBuiltinMemoryRows() {
  return getDb().select().from(schema.builtinMemories);
}

export async function upsertBuiltinMemoryRow(
  key: BuiltinMemoryKey,
  content: string,
) {
  const [row] = await getDb()
    .insert(schema.builtinMemories)
    .values({ key, content, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: schema.builtinMemories.key,
      set: { content, updatedAt: new Date() },
    })
    .returning();

  return row;
}
