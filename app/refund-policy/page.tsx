import type { Metadata } from "next";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { policies } from "@/lib/policies";

const policy = policies["refund-policy"];

export const metadata: Metadata = {
  title: `${policy.title} | patara`,
  description: "Refund and Return Policy for patara / PATARA LLC.",
};

export default function RefundPolicyPage() {
  return <PolicyLayout policy={policy} />;
}
