const IP = "nanosmp.spwn.ir";
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
async function copyAddress() {
  try {
    await navigator.clipboard.writeText(IP);
    document.getElementById("copyFeedback").textContent = "آدرس سرور کپی شد! حالا وارد Minecraft شو.";
    showToast("آدرس سرور کپی شد!");
  } catch (e) {
    document.getElementById("copyFeedback").textContent = "آدرس را دستی کپی کن: " + IP;
    showToast("کپی خودکار در این مرورگر در دسترس نیست.");
  }
}
document.getElementById("copyIp").addEventListener("click", copyAddress);
document.getElementById("heroCopy").addEventListener("click", copyAddress);
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
}));
// Live status is optional; failures are shown honestly rather than fabricating player counts.
async function loadStatus() {
  const title = document.getElementById("statusTitle");
  const detail = document.getElementById("statusText");
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);
    const response = await fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(IP), {signal: controller.signal});
    clearTimeout(timeout);
    if (!response.ok) throw new Error("status unavailable");
    const data = await response.json();
    if (data.online) {
      title.textContent = "سرور آنلاین";
      detail.textContent = (data.players?.online ?? "؟") + " بازیکن آنلاین";
    } else {
      title.textContent = "وضعیت سرور";
      detail.textContent = "فعلاً آفلاین یا غیرقابل‌دسترسی";
    }
  } catch (_) {
    title.textContent = "آدرس سرور";
    detail.textContent = IP;
  }
}
loadStatus();
