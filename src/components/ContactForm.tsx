import { useState } from 'react';

interface Props {
  labels: {
    name: string; email: string; subject: string; message: string; send: string;
    name_required: string; email_invalid: string; message_required: string;
  };
}

export default function ContactForm({ labels }: Props) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = labels.name_required;
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = labels.email_invalid;
    if (!form.message.trim()) errs.message = labels.message_required;
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const text = `Olá Victor!\n\nNome: ${form.name}\nEmail: ${form.email}\nAssunto: ${form.subject}\nMensagem: ${form.message}`;
    const url = `https://wa.me/5549998218294?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }

  const inputClass = "w-full bg-[var(--color-navy-light)] border border-[var(--color-border)] rounded px-3 py-2 text-[var(--color-text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-colors placeholder:text-[var(--color-text-secondary)]/50";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="name" className="text-[var(--color-text-secondary)] text-xs mb-1 block">{labels.name} *</label>
        <input id="name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} />
        {errors.name && <p className="text-red-400 text-xs mt-1" role="alert" aria-live="polite">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-[var(--color-text-secondary)] text-xs mb-1 block">{labels.email}</label>
        <input id="email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} />
        {errors.email && <p className="text-red-400 text-xs mt-1" role="alert" aria-live="polite">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="subject" className="text-[var(--color-text-secondary)] text-xs mb-1 block">{labels.subject}</label>
        <input id="subject" type="text" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} className={inputClass} />
      </div>
      <div>
        <label htmlFor="message" className="text-[var(--color-text-secondary)] text-xs mb-1 block">{labels.message} *</label>
        <textarea id="message" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={`${inputClass} resize-none`} />
        {errors.message && <p className="text-red-400 text-xs mt-1" role="alert" aria-live="polite">{errors.message}</p>}
      </div>
      <button type="submit" className="bg-[var(--color-accent)] text-[var(--color-navy)] font-semibold px-6 py-3 rounded hover:opacity-90 transition-colors flex items-center gap-2 justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        {labels.send}
      </button>
    </form>
  );
}
