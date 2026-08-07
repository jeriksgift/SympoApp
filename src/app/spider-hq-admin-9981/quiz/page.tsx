import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/guard";
import AdminDashboard from "../../admin/quiz/AdminDashboard";

export default async function SecretAdminQuizPage() {
  const session = await getSession();
  if (!session) redirect("/spider-hq-admin-9981?rt=/spider-hq-admin-9981/quiz");
  if (session.role !== "admin") redirect("/enter");

  return <AdminDashboard />;
}
