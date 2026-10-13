import { createFileRoute } from '@tanstack/react-router';
import { AdminPage } from '@/components/reading/admin';
export const Route = createFileRoute('/admin')({
 head: () => ({meta:[{title:'Կառավարման ցուցադրական բաժին — Փոքրիկ ընթերցասերներ'},{name:'description',content:'Ընթերցանության ակումբի բովանդակության և արդյունքների ցուցադրական կառավարում։'},{property:'og:title',content:'Կառավարման ցուցադրական բաժին — Փոքրիկ ընթերցասերներ'},{property:'og:description',content:'Ընթերցանության ակումբի բովանդակության և արդյունքների ցուցադրական կառավարում։'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'},{name:'robots',content:'noindex,nofollow'}]}),
 component: Page,
});
function Page(){return <AdminPage />}
