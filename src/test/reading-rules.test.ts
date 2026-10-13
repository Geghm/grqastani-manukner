import {describe,it,expect} from 'vitest';
import {initialCategories,initialQuestions,gradeQuiz,videoSource} from '@/components/reading/data';
describe('Reading platform rules',()=>{
 it('includes the six requested curriculum categories',()=>{expect(initialCategories.map(c=>c.title)).toEqual(['Բարի գալուստ Գրքաստան','Հեքիաթների մոգական աշխարհում','Առակների իմաստության դասերը','Մանկական գրականության գանձարանում','Փոքրիկ հեղինակների արվեստանոց','Տարվա գրական փառատոն']);});
 it('supports all five requested quiz question types',()=>{expect(new Set(initialQuestions.filter(q=>q.storyId==='fox').map(q=>q.kind))).toEqual(new Set(['choice','written','boolean','image','order']));});
 it('does not award automatic points for written answers',()=>{const qs=initialQuestions.filter(q=>q.storyId==='fox');const answers=Object.fromEntries(qs.map(q=>[q.id,q.kind==='written'?'Իմ կարծիքը':q.correct]));expect(gradeQuiz(qs,answers)).toEqual({earned:4,total:4,pending:1});});
 it('embeds YouTube instead of redirecting to its watch page',()=>{expect(videoSource('https://www.youtube.com/watch?v=abcdefghijk')).toEqual({type:'embed',url:'https://www.youtube-nocookie.com/embed/abcdefghijk?rel=0'});});
 it('rejects executable and unsupported video URLs',()=>{expect(videoSource('javascript:alert(1)')).toBeNull();expect(videoSource('https://example.com/page')).toBeNull();});
});
