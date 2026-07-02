import { Metadata } from "next";
import { getServiceBySlug } from "@/lib/data/services";
import ServicePageTemplate from "@/components/ui/ServicePageTemplate";
import { notFound } from "next/navigation";

const service = getServiceBySlug("game-development")!;

export const metadata: Metadata = {
  title: `${service.title} — Nexora Digital Labs`,
  description: service.tagline,
};

export default function Page() {
  if (!service) return notFound();
  return <ServicePageTemplate service={service} />;
}
