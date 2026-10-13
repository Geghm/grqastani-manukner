import { createFileRoute } from '@tanstack/react-router';
import { LibraryPage } from '@/components/reading/library';
export const Route = createFileRoute('/categories/$id')({
 head: () => ({meta:[{title:'Գրքաստանի աշխարհները — Փոքրիկ ընթերցասերներ'},{name:'description',content:'Ընթերցանության վեց ուսումնական բաժինները։'},{property:'og:title',content:'Գրքաստանի աշխարհները — Փոքրիկ ընթերցասերներ'},{property:'og:description',content:'Ընթերցանության վեց ուսումնական բաժինները։'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Page,
});
function Page(){const {id}=Route.useParams();return <LibraryPage categoryId={id}/>}
