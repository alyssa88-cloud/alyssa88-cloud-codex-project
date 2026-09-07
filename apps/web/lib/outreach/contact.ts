export const BUSINESS_WHATSAPP = "WhatsApp: +8613553392168";

export function ensureBusinessContact(htmlBody: string): string {
  if (htmlBody.includes(BUSINESS_WHATSAPP)) return htmlBody;
  return `${htmlBody}<p>${BUSINESS_WHATSAPP}</p>`;
}
