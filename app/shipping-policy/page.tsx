import type { Metadata } from "next";
import { PolicyLayout } from "@/components/site/PolicyLayout";
import { policies } from "@/lib/policies";

const policy = policies["shipping-policy"];

export const metadata: Metadata = {
  title: `${policy.title} | patara`,
  description: "Shipping Policy for patara / PATARA LLC.",
};

export default function ShippingPolicyPage() {
  return <PolicyLayout policy={policy} />;
}
