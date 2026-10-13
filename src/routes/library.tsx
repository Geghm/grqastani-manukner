import { createFileRoute } from '@tanstack/react-router';
import { LibraryPage } from '@/components/reading/library';
export const Route = createFileRoute('/library')({
 head: () => ({meta:[{title:'Մեր գրադարանը — Փոքրիկ ընթերցասերներ'},{name:'description',content:'Հայերեն հեքիաթների ու պատմությունների ընթերցանության գրադարան։'},{property:'og:title',content:'Մեր գրադարանը — Փոքրիկ ընթերցասերներ'},{property:'og:description',content:'Հայերեն հեքիաթների ու պատմությունների ընթերցանության գրադարան։'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Page,
});
function Page(){return <LibraryPage />}
