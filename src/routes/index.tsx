import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/reading/home";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Փոքրիկ ընթերցասերներ — Բարի գալուստ Գրքաստան" },
      {
        name: "description",
        content:
          "Հայերեն պատմություններ, հեքիաթներ և ուրախ առաջադրանքներ 3–4-րդ դասարանների ընթերցասերների համար։",
      },
      { property: "og:title", content: "Փոքրիկ ընթերցասերներ — Գրքաստան" },
      {
        property: "og:description",
        content: "Կարդա, բացահայտիր ու երազիր մեր դպրոցական ընթերցանության ակումբում։",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
