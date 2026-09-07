export const FOLLOW_UP_INTERVALS_BUSINESS_DAYS = [2, 5, 7, 15, 30] as const;

/**
 * Sequence steps: 0 = initial email, 1..5 = follow-ups.
 * Each interval is measured from the previous successful send.
 */
export function addBusinessDays(from: Date, businessDays: number): Date {
  if (businessDays < 0) throw new Error("businessDays must be >= 0");
  const result = new Date(from);
  let remaining = businessDays;
  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + 1);
    const day = result.getUTCDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return result;
}

export function nextFollowUpDate(sentAt: Date, currentStep: number): Date | null {
  if (currentStep < 0 || currentStep > FOLLOW_UP_INTERVALS_BUSINESS_DAYS.length) {
    throw new Error(`Invalid outreach sequence step: ${currentStep}`);
  }
  if (currentStep === FOLLOW_UP_INTERVALS_BUSINESS_DAYS.length) return null;
  return addBusinessDays(sentAt, FOLLOW_UP_INTERVALS_BUSINESS_DAYS[currentStep]);
}

export function followUpSubject(subject: string | null | undefined, step: number): string {
  const base = subject?.trim() || "Quick question";
  return step === 1 ? base : `Re: ${base.replace(/^Re:\s*/i, "")}`;
}
