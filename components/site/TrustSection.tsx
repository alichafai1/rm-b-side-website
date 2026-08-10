import { siteContent } from "@/lib/content";

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 7.5h11.5V16H3V7.5Zm11.5 3H18l2.5 3V16h-6v-5.5ZM7 18.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 10.5V8a4.5 4.5 0 1 1 9 0v2.5M6.5 10.5h11A1.5 1.5 0 0 1 19 12v6.5A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5V12a1.5 1.5 0 0 1 1.5-1.5Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-7 w-7"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3.5 5.5 6v5.2c0 4.1 2.7 7.8 6.5 9.3 3.8-1.5 6.5-5.2 6.5-9.3V6L12 3.5Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9.5 12 1.8 1.8 3.7-3.8"
      />
    </svg>
  );
}

const icons = {
  shipping: TruckIcon,
  payment: LockIcon,
  returns: ShieldIcon,
} as const;

export function TrustSection() {
  const items = siteContent.trust;

  return (
    <section className="border-y border-line bg-surface/40 px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3 sm:gap-8">
        {items.map((item) => {
          const Icon = icons[item.id];

          return (
            <div
              key={item.id}
              className="flex flex-col items-center text-center sm:items-start sm:text-left"
            >
              <div className="text-accent">
                <Icon />
              </div>
              <h3 className="mt-4 text-base font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
