"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/useLanguage";
import { Button } from "@/components/fashion/ui/Button";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const { dictionary } = useLanguage();
  const { contactForm } = dictionary;
  const [status, setStatus] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl2 border border-brand-200 bg-brand-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-brand-600" aria-hidden="true" />
        <h3 className="mt-4 text-lg font-semibold text-ink-900">{contactForm.successTitle}</h3>
        <p className="mt-2 text-sm text-ink-600">{contactForm.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-ink-800">
            {contactForm.fields.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={contactForm.fields.namePlaceholder}
            className="rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="company" className="text-sm font-medium text-ink-800">
            {contactForm.fields.company}
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder={contactForm.fields.companyPlaceholder}
            className="rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-ink-800">
            {contactForm.fields.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={contactForm.fields.emailPlaceholder}
            className="rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="volume" className="text-sm font-medium text-ink-800">
            {contactForm.fields.volume}
          </label>
          <select
            id="volume"
            name="volume"
            required
            defaultValue=""
            className="rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          >
            <option value="" disabled>
              {contactForm.fields.volumeOptions.placeholder}
            </option>
            <option value="under-1000">{contactForm.fields.volumeOptions.low}</option>
            <option value="1000-10000">{contactForm.fields.volumeOptions.mid}</option>
            <option value="10000-50000">{contactForm.fields.volumeOptions.high}</option>
            <option value="50000-plus">{contactForm.fields.volumeOptions.enterprise}</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-ink-800">
            {contactForm.fields.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder={contactForm.fields.messagePlaceholder}
            className="resize-none rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500"
          />
        </div>
      </div>

      {status === "error" ? (
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-medium">{contactForm.errorTitle}</p>
            <p>{contactForm.errorBody}</p>
          </div>
        </div>
      ) : null}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? contactForm.submitting : contactForm.submit}
      </Button>
    </form>
  );
}
