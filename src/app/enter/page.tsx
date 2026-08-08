import { headers } from "next/headers";
import { eventFromHost, type EventKey } from "@/lib/config";
import QuizEntry from "./QuizEntry";
import PlatformEntry from "./PlatformEntry";

/**
 * The login screen, picked by host/path — the UI counterpart to the dispatch in
 * `api/enter/route.ts`.
 *
 * Defaults to the "ctf" event on path-based single domain deployments.
 */
export default async function EnterPage({ searchParams }: { searchParams?: Promise<{ rt?: string }> }) {
  const host = (await headers()).get("host");
  const params = await searchParams;
  const rt = params?.rt;

  let event: EventKey | null = eventFromHost(host);
  if (!event && rt) {
    if (rt.includes("/ctf")) event = "ctf";
    else if (rt.includes("/quiz")) event = "quiz";
    else if (rt.includes("/hunt")) event = "hunt";
    else if (rt.includes("/code")) event = "code";
  }
  // Default for single domain deployment (multiversebreach.jeriksgift.workers.dev)
  if (!event) {
    event = "ctf";
  }

  return event === "quiz" ? <QuizEntry /> : <PlatformEntry event={event} />;
}
