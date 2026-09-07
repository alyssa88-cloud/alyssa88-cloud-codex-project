const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

export type GraphMailInput = {
  accessToken: string;
  to: string;
  subject: string;
  htmlBody: string;
};

export async function sendMicrosoftGraphMail(input: GraphMailInput) {
  const response = await fetch(`${GRAPH_BASE}/me/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${input.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: input.subject,
        body: { contentType: "HTML", content: input.htmlBody },
        toRecipients: [{ emailAddress: { address: input.to } }],
      },
      saveToSentItems: true,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Microsoft Graph sendMail failed: ${response.status} ${detail}`);
  }
}
