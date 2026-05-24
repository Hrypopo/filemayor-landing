import { Resend } from 'resend';

export const EMAIL_FROM = process.env.EMAIL_FROM ?? 'FileMayor <hello@filemayor.com>';

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY ?? '');
  }
  return _resend;
}

// Proxy that defers instantiation until first call so the build never requires RESEND_API_KEY.
export const resend = {
  emails: {
    send: (...args: Parameters<Resend['emails']['send']>) => getResend().emails.send(...args),
  },
};
