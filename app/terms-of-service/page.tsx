import type { Metadata } from "next";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { policies } from "@/lib/policies";

const policy = policies["terms-of-service"];

export const metadata: Metadata = {
  title: `${policy.title} | patara`,
  description: "Terms of Service for patara / PATARA LLC.",
};

export default function TermsOfServicePage() {
  return <PolicyLayout policy={policy} />;
}
