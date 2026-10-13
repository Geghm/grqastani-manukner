import fox from '@/assets/fox.jpg';
import nazar from '@/assets/nazar.jpg';
import sparrow from '@/assets/sparrow.jpg';
import bookland from '@/assets/bookland.jpg';
export { fox, nazar, sparrow, bookland };
export const initialCategories = [
 { id:'welcome', title:'Բարի գալուստ Գրքաստան', icon:'book', description:'Առաջին քայլերը դեպի գրքերի հրաշալի աշխարհ', tone:'mint' },
 { id:'fairy', title:'Հեքիաթների մոգական աշխարհում', icon:'wand', description:'Բացահայտիր հեքիաթների անսպասելի հրաշքները', tone:'lavender' },
 { id:'fable', title:'Առակների իմաստության դասերը', icon:'leaf', description:'Փոքրիկ պատմություններ, մեծ իմաստություն', tone:'peach' },
 { id:'treasury', title:'Մանկական գրականության գանձարանում', icon:'gem', description:'Սիրելի հեղինակներ ու անմոռանալի հերոսներ', tone:'sky' },
 { id:'workshop', title:'Փոքրիկ հեղինակների արվեստանոց', icon:'pencil', description:'Քո երևակայությունը դարձրու պատմություն', tone:'rose' },
 { id:'festival', title:'Տարվա գրական փառատոն', icon:'party', description:'Տոնենք ընթերցանությունն ու մեր հաջողությունները', tone:'yellow' },
];
export type Category = typeof initialCategories[number];
export type Story = { id:string; title:string; author:string; description:string; category:string; image:string; minutes:number; status:string; content:string[] };
export const initialStories: Story[] = [
 {id:'fox', title:'Աղվեսն ու իր ստվերը',author:'Ընթերցասերների ակումբ',description:'Մի փոքրիկ աղվեսի պատմություն՝ ինքն իրեն ճանաչելու և ընկերության մասին։',category:'fable',image:fox,minutes:5,status:'Հրապարակված',content:[
 'Մի պայծառ առավոտ փոքրիկ աղվեսը դուրս եկավ անտառի արահետով զբոսնելու։ Արևը դեռ ցածր էր, և նրա ստվերը երկար ձգվում էր կանաչ խոտի վրա։',
 '«Ինչքա՜ն մեծ եմ ես»,— ուրախացավ աղվեսը։ Նա որոշեց, որ կարող է միայնակ անցնել անտառի ամենալայն գետը։ Ճանապարհին հանդիպեց իր ընկեր ճնճղուկին։',
 '«Ստվերդ մեծ է, բայց գետը նույնպես մեծ է։ Եկ միասին ապահով անցում փնտրենք»,— ասաց ճնճղուկը։ Աղվեսը սկզբում չլսեց նրան և մոտեցավ ջրին։',
 'Կեսօրին արևը բարձրացավ։ Աղվեսի ստվերը փոքրացավ, և նա հասկացավ, որ ստվերը չի ցույց տալիս իր իսկական ուժը։ Նա վերադարձավ ընկերոջ մոտ։',
 'Երկուսով նրանք գտան մի փոքրիկ կամուրջ և անվտանգ անցան մյուս ափը։ Աղվեսը ժպտաց. «Ընկերոջ լավ խորհուրդը ավելի մեծ ուժ է, քան երկար ստվերը»։',
 'Այդ օրվանից փոքրիկ աղվեսը ոչ միայն նայում էր իր ստվերին, այլև լսում էր ընկերներին։ Իսկ անտառում նրանց սպասում էին նոր ու բարի արկածներ։'
 ]},
 {id:'nazar',title:'Քաջ Նազարը',author:'Հովհաննես Թումանյան',description:'Հանդիպիր Նազարին ու բացահայտիր նրա զվարճալի արկածները։',category:'fairy',image:nazar,minutes:8,status:'Հրապարակված',content:[
 'Լինում է, չի լինում՝ մի աղքատ մարդ է լինում, անունը՝ Նազար։ Էս Նազարը մի անշնորհք ու ալարկոտ մարդ է լինում. է՜նքան էլ վախկոտ, որ մենակ ոտը ոտի առաջ չէր դնիլ, թեկուզ մեռնիլիս լիներ։',
 'Մի օր Նազարը ճանճեր է քշում։ Հարվածում է ու տեսնում, որ մի քանի ճանճ է ընկել։ «Ես այսքան քա՞ջ եմ»,— զարմանում է նա։',
 'Նազարը մի դրոշակ է վերցնում ու ճանապարհ ընկնում։ Ճանապարհին հանդիպած մարդիկ լսում են նրա պատմությունը և զարմանում։',
 'Այս զվարճալի պատմությունը մեզ հրավիրում է մտածելու՝ ինչո՞վ են տարբերվում իսկական քաջությունն ու պատահական հաջողությունը։ Կարդա հեքիաթի ամբողջական տարբերակը նաև քո դասարանի գրադարանում։'
 ]},
 {id:'sparrow',title:'Փոքրիկ ճնճղուկը',author:'Ընթերցասերների ակումբ',description:'Մի բարի պատմություն փոքրիկ թռչունի ու մեծ երազանքի մասին։',category:'treasury',image:sparrow,minutes:6,status:'Հրապարակված',content:[
 'Գյուղի ծայրին մի փոքրիկ ճնճղուկ էր ապրում։ Նրա բույնը ծաղկած ծիրանենու ճյուղերի մեջ էր, իսկ ամենասիրելի զբաղմունքը՝ առավոտյան երգելը։',
 'Ճնճղուկը երազում էր տեսնել հեռավոր լեռները։ Բայց իր թևերը դեռ թույլ էին։ Նա ամեն օր մի փոքր ավելի հեռու էր թռչում և միշտ վերադառնում իր բույնը։',
 'Մի օր նա հանդիպեց արագիլին։ «Մեծ երազանքներին հասնում ենք փոքր քայլերով»,— ասաց արագիլը։ Ճնճղուկը շարունակեց սովորել և մարզվել։',
 'Գարնան վերջում նա բարձրացավ գյուղի ամենաբարձր ծառի վրա։ Այնտեղից երևում էին լեռները։ Նրա սիրտը ուրախությամբ լցվեց։',
 'Փոքրիկ ճնճղուկը հասկացավ՝ ամեն օր սովորելը մի օր քեզ հասցնում է քո երազանքին։'
 ]},
 {id:'book',title:'Գրքի կախարդական դուռը',author:'Ընթերցասերների ակումբ',description:'Բացիր գիրքը և սկսիր քո առաջին ճամփորդությունը Գրքաստանում։',category:'welcome',image:bookland,minutes:4,status:'Հրապարակված',content:['Անին դպրոցի գրադարանում գտավ մի փոքրիկ կանաչ գիրք։ Առաջին էջին գրված էր. «Ամեն գիրք մի նոր աշխարհ է»։','Նա բացեց գիրքը և սկսեց կարդալ։ Պատմության մեջ կային անտառներ, բարի կենդանիներ ու մի փոքրիկ գյուղ։ Անին կարծես քայլում էր հերոսների կողքով։','Երբ զանգը հնչեց, նա փակեց գիրքը, բայց պատմությունը մնաց նրա մտքում։ Նա ընկերներին պատմեց իր կարդացածի մասին։','Այդ օրը Անին հասկացավ՝ գրքի կախարդական դուռը բացվում է ամեն անգամ, երբ սկսում ենք կարդալ։']},
 {id:'writer',title:'Իմ առաջին պատմությունը',author:'Ստեղծագործական առաջադրանք',description:'Ընտրիր հերոսին, պատկերացրու մի արկած և ստեղծիր քո պատմությունը։',category:'workshop',image:fox,minutes:7,status:'Հրապարակված',content:['Պատկերացրու՝ մի առավոտ քո գրքի միջից դուրս է գալիս փոքրիկ աղվեսը։ Նա կորցրել է իր պատմության վերջին էջը։','Որտե՞ղ կփնտրեք էջը։ Ո՞ւմ կհանդիպեք ճանապարհին։ Ինչպե՞ս կավարտվի ձեր արկածը։','Գրիր պատմություն՝ սկիզբ, հետաքրքիր դեպք և ավարտ։ Հիշիր՝ քո երևակայությունը սահմաններ չունի։']},
 {id:'festival',title:'Մեր գրական տոնը',author:'Ընթերցասերների ակումբ',description:'Հերոսներ, պատմություններ և ընթերցանության ուրախ տոն։',category:'festival',image:nazar,minutes:4,status:'Հրապարակված',content:['Դասարանում այսօր գրական տոն էր։ Երեխաներից յուրաքանչյուրը բերել էր իր սիրելի գիրքը։','Մեկը կարդաց բանաստեղծություն, մյուսը պատմեց հեքիաթ, իսկ Անին ներկայացրեց իր գրած պատմությունը։','Տոնի վերջում երեխաները գրքերը փոխանակեցին։ Բոլորը համաձայնեցին՝ ընթերցանությունը ավելի հետաքրքիր է, երբ կիսվում ես ընկերներիդ հետ։']},
];
export type QuestionKind = 'choice'|'written'|'boolean'|'image'|'order';
export type Question = {id:string;storyId:string;kind:QuestionKind;title:string;options:string[];correct:string;points:number;image?:string};
export const initialQuestions: Question[] = [
 {id:'q1',storyId:'fox',kind:'choice',title:'Ինչո՞ւ աղվեսը առավոտյան կարծում էր, որ շատ մեծ է։',options:['Նրա ստվերը երկար էր։','Նա բարձրացել էր ծառի վրա։','Ընկերն այդպես էր ասել։'],correct:'Նրա ստվերը երկար էր։',points:1},
 {id:'q2',storyId:'fox',kind:'boolean',title:'Ճնճղուկը խորհուրդ տվեց միասին ապահով անցում փնտրել։',options:['Ճիշտ է','Սխալ է'],correct:'Ճիշտ է',points:1},
 {id:'q3',storyId:'fox',kind:'image',title:'Ո՞ր կենդանին է պատմության գլխավոր հերոսը։',options:['Աղվեսը','Ճնճղուկը','Արջը'],correct:'Աղվեսը',points:1,image:fox},
 {id:'q4',storyId:'fox',kind:'order',title:'Դասավորիր դեպքերը պատմության ճիշտ հերթականությամբ։',options:['Աղվեսը տեսավ երկար ստվերը։','Ճնճղուկը խորհուրդ տվեց։','Ընկերները գտան կամուրջը։'],correct:'Աղվեսը տեսավ երկար ստվերը։|Ճնճղուկը խորհուրդ տվեց։|Ընկերները գտան կամուրջը։',points:1},
 {id:'q5',storyId:'fox',kind:'written',title:'Ի՞նչ սովորեց աղվեսը։ Գրիր քո կարծիքը։',options:[],correct:'',points:1},
 ...['nazar','sparrow','book','writer','festival'].flatMap(id=>[
 {id:`${id}-1`,storyId:id,kind:'choice' as const,title:'Ի՞նչ է մեզ սովորեցնում այս պատմությունը։',options:['Լինել ուշադիր, բարի և մտածել մեր արարքների մասին։','Երբեք չլսել ընկերներին։','Դադարել սովորել։'],correct:'Լինել ուշադիր, բարի և մտածել մեր արարքների մասին։',points:1},
 {id:`${id}-2`,storyId:id,kind:'written' as const,title:'Ո՞ր պահը քեզ ամենաշատը դուր եկավ և ինչո՞ւ։',options:[],correct:'',points:1}
 ])
];
export type Video = {id:string;title:string;description:string;category:string;image:string;url:string;status:string};
export const initialVideos: Video[] = [
 {id:'v1',title:'Քաջ Նազարի արկածները',description:'Հեքիաթի ցուցադրական տեսաքարտ։ Ավելացրեք ակումբի հաստատված տեսանյութը։',category:'Հեքիաթներ',image:nazar,url:'',status:'Նախագիծ'},
 {id:'v2',title:'Աղվեսն ու ընկերները',description:'Ընկերության մասին բարի պատմություններ։',category:'Առակներ',image:fox,url:'',status:'Նախագիծ'},
 {id:'v3',title:'Փոքրիկ ճնճղուկի աշխարհը',description:'Բացահայտենք բնությունը մեր փոքրիկ հերոսի հետ։',category:'Ուսուցողական',image:sparrow,url:'',status:'Նախագիծ'}
];
export const sampleStudents = [
 {id:'s1',name:'Անի',surname:'Հարությունյան',className:'3Ա',score:92,completed:8},
 {id:'s2',name:'Դավիթ',surname:'Մկրտչյան',className:'4Բ',score:85,completed:6},
 {id:'s3',name:'Մարի',surname:'Սարգսյան',className:'3Բ',score:96,completed:10},
 {id:'s4',name:'Արամ',surname:'Պետրոսյան',className:'4Ա',score:78,completed:5}
];
export const kindLabels: Record<QuestionKind,string> = {choice:'Ընտրովի պատասխան',written:'Գրավոր պատասխան',boolean:'Ճիշտ / սխալ',image:'Պատկերով հարց',order:'Դեպքերի հերթականություն'};
export function gradeQuiz(questions:Question[],answers:Record<string,string>) {
 const auto=questions.filter(q=>q.kind!=='written');
 return {earned:auto.reduce((sum,q)=>sum+(answers[q.id]===q.correct?q.points:0),0),total:auto.reduce((sum,q)=>sum+q.points,0),pending:questions.filter(q=>q.kind==='written').length};
}
export function videoSource(value:string) {
 try { const url=new URL(value); if(url.protocol!=='https:' && url.protocol!=='blob:') return null;
 if(['youtube.com','www.youtube.com','m.youtube.com','youtu.be'].includes(url.hostname)){const id=url.hostname==='youtu.be'?url.pathname.slice(1):url.searchParams.get('v')||url.pathname.split('/').at(-1);return id&&/^[a-zA-Z0-9_-]{11}$/.test(id)?{type:'embed',url:`https://www.youtube-nocookie.com/embed/${id}?rel=0`}:null;}
 return /\.(mp4|webm|ogg)$/i.test(url.pathname)||url.protocol==='blob:'?{type:'file',url:value}:null;
 } catch{return null;}
}
