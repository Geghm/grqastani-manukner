import { createFileRoute } from '@tanstack/react-router';
import { QuizPage } from '@/components/reading/quiz';
export const Route = createFileRoute('/quiz/$id')({
 head: () => ({meta:[{title:'Ընթերցանության հարցաշար — Փոքրիկ ընթերցասերներ'},{name:'description',content:'Մտածիր պատմության մասին և պատասխանիր հետաքրքիր հարցերին։'},{property:'og:title',content:'Ընթերցանության հարցաշար — Փոքրիկ ընթերցասերներ'},{property:'og:description',content:'Մտածիր պատմության մասին և պատասխանիր հետաքրքիր հարցերին։'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Page,
});
function Page(){const {id}=Route.useParams();return <QuizPage id={id}/>}
