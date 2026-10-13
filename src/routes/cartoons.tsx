import { createFileRoute } from "@tanstack/react-router";
import { CartoonsPage } from "@/components/reading/cartoons";
export const Route = createFileRoute("/cartoons")({
  head: () => ({
    meta: [
      { title: "Մուլտֆիլմերի աշխարհ — Փոքրիկ ընթերցասերներ" },
      { name: "description", content: "Դիտիր սիրելի հերոսների արկածները մեր հարթակում։" },
      { property: "og:title", content: "Մուլտֆիլմերի աշխարհ — Փոքրիկ ընթերցասերներ" },
      { property: "og:description", content: "Դիտիր սիրելի հերոսների արկածները մեր հարթակում։" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  return <CartoonsPage />;
}
