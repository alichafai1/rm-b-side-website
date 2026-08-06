import type { Metadata } from "next";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { policies } from "@/lib/policies";

const policy = policies["privacy-policy"];

export const metadata: Metadata = {
  title: `${policy.title} | patara`,
  description: "Privacy Policy for patara / PATARA LLC.",
};

export default function PrivacyPolicyPage() {
  return <PolicyLayout policy={policy} />;
}
