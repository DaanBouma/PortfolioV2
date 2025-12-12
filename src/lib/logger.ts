export function Logger(...messages: (string | null | undefined)[]) {
  const envMode = (process.env.LOG_MODE || "none").toLowerCase().trim();

  const purple = "\x1b[35m";
  const cyan = "\x1b[36m";
  const reset = "\x1b[0m";

  const now = new Date();
  const timestamp = `${String(now.getHours()).padStart(2, "0")}:${String(
    now.getMinutes()
  ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

  const devMsg = messages[0] || null;
  const serverMsg = messages[1] || null;
  const miniMsg = messages[2] || null;

  if (envMode === "none") return;

  if (envMode === "minimalistic") {
    if (miniMsg) console.log(miniMsg);
    return;
  }

  if (envMode === "server") {
    if (serverMsg) console.log(`${cyan}[SERVER ${timestamp}]${reset}`, serverMsg);
    return;
  }

  if (devMsg) console.log(`${purple}[DEV ${timestamp}]${reset}`, devMsg);
}
