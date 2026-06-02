const LITE_MODE_STORAGE_KEY = "portfolioLiteMode";
const LITE_MODE_EVENT = "portfolio-lite-mode-change";

const normalizeCommandText = (value) =>
  String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

export function getPortfolioLiteMode() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LITE_MODE_STORAGE_KEY) === "true";
}

export function setPortfolioLiteMode(isLiteMode) {
  if (typeof window === "undefined") return false;

  const nextValue = Boolean(isLiteMode);
  window.localStorage.setItem(LITE_MODE_STORAGE_KEY, String(nextValue));
  window.dispatchEvent(
    new CustomEvent(LITE_MODE_EVENT, {
      detail: { isLiteMode: nextValue },
    })
  );

  return nextValue;
}

export function parseAppCommand(input) {
  const text = normalizeCommandText(input);
  const mentionsLiteMode =
    /\blite\s*mode\b/.test(text) ||
    /\blite\b/.test(text) ||
    text.includes("che do nhe") ||
    text.includes("ban nhe");

  if (!mentionsLiteMode) return null;

  if (/\b(bat|enable|on|turn on|mo|mo len|active|activate)\b/.test(text)) {
    return {
      action: "set_lite_mode",
      args: { enabled: true },
    };
  }

  if (/\b(tat|disable|off|turn off|dong|deactivate)\b/.test(text)) {
    return {
      action: "set_lite_mode",
      args: { enabled: false },
    };
  }

  if (/\b(toggle|switch|doi|chuyen)\b/.test(text)) {
    return {
      action: "set_lite_mode",
      args: { enabled: !getPortfolioLiteMode() },
    };
  }

  return null;
}

export function executeAppCommand(command) {
  if (command?.action !== "set_lite_mode") return null;

  const enabled = setPortfolioLiteMode(command.args?.enabled);

  return {
    action: command.action,
    message: enabled ? "Đã bật Lite mode." : "Đã tắt Lite mode.",
  };
}
