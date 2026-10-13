import { createFileRoute } from "@tanstack/react-router";
import { StudentPage } from "@/components/reading/student";
export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Իմ ընթերցասեր անկյունը — Փոքրիկ ընթերցասերներ" },
      {
        name: "description",
        content: "Ընթերցանության ձեռքբերումներ ու առաջընթաց ցուցադրական միջավայրում։",
      },
      { property: "og:title", content: "Իմ ընթերցասեր անկյունը — Փոքրիկ ընթերցասերներ" },
      {
        property: "og:description",
        content: "Ընթերցանության ձեռքբերումներ ու առաջընթաց ցուցադրական միջավայրում։",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <StudentPage />;
}
