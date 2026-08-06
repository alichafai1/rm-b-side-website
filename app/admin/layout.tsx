import { AdminNav } from "@/components/admin/AdminNav";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;

  if (getSupabaseEnv()) {
    try {
      const supabase = await createClient();
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      user = authUser;
    } catch {
      user = null;
    }
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      {user ? <AdminNav /> : null}
      <div className="flex-1">{children}</div>
    </div>
  );
}
