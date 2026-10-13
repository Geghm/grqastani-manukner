import { createFileRoute } from "@tanstack/react-router";
import { StoryPage } from "@/components/reading/story";
export const Route = createFileRoute("/story/$id")({
  head: () => ({
    meta: [
      { title: "Պատմության ընթերցում — Փոքրիկ ընթերցասերներ" },
      {
        name: "description",
        content: "Կարդա հայերեն պատմություններ և բացահայտիր հերոսների աշխարհը։",
      },
      { property: "og:title", content: "Պատմության ընթերցում — Փոքրիկ ընթերցասերներ" },
      {
        property: "og:description",
        content: "Կարդա հայերեն պատմություններ և բացահայտիր հերոսների աշխարհը։",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const { id } = Route.useParams();
  return <StoryPage id={id} />;
}
