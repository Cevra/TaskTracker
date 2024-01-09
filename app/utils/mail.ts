import type { MailerOptions } from 'types';
import { SENDGRID_API_KEY } from '@env';

export async function sendEmail(options: MailerOptions) {
  const content = [];

  if (options.html) {
    content.push({
      type: 'text/html',
      value: options.html,
    });
  }

  if (options.text) {
    content.push({
      type: 'text/plain',
      value: options.text,
    });
  }

  return fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [
            {
              email: options.to,
            },
          ],
        },
      ],
      from: {
        email: options.from,
      },
      subject: options.subject,
      content,
    }),
  }).catch((e) => {
    throw new  Error('Failed to send email');
  });
}
