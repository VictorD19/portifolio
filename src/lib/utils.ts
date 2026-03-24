export function idToSlug(id: string): string {
  return id.replace(/(pt|en|es)$/, '');
}

export function getReadingTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.ceil(words / 200);
}

export function formatDate(date: Date, lang: string): string {
  return new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
}

export function buildWhatsAppUrl(data: { name: string; email: string; subject: string; message: string }): string {
  const text = `Olá Victor!\n\nNome: ${data.name}\nEmail: ${data.email}\nAssunto: ${data.subject}\nMensagem: ${data.message}`;
  return `https://wa.me/5549998218294?text=${encodeURIComponent(text)}`;
}
