import { createContext, useContext, useState, type ReactNode } from 'react';
import {initialStories, initialCategories, initialQuestions, initialVideos, type Story, type Category, type Question, type Video} from './data';
export type Submission={id:string;storyId:string;name:string;className:string;answers:Record<string,string>;earned:number;total:number;date:string};
function useReadingState(){
 const [stories,setStories]=useState<Story[]>(initialStories);
 const [categories,setCategories]=useState<Category[]>(initialCategories);
 const [questions,setQuestions]=useState<Question[]>(initialQuestions);
 const [videos,setVideos]=useState<Video[]>(initialVideos);
 const [student,setStudent]=useState({name:'',surname:'',className:'3Ա'});
 const [completed,setCompleted]=useState<string[]>([]);
 const [submissions,setSubmissions]=useState<Submission[]>([]);
 const [homeTitle,setHomeTitle]=useState('Բարի գալուստ Գրքաստան');
 const [homeSubtitle,setHomeSubtitle]=useState('Այստեղ ամեն գիրք նոր արկած է, իսկ դու՝ նրա գլխավոր հերոսը։ Կարդա՛, բացահայտի՛ր ու երազի՛ր մեզ հետ։');
 const [featured,setFeatured]=useState(['fox','nazar','sparrow']);
 return {stories,setStories,categories,setCategories,questions,setQuestions,videos,setVideos,student,setStudent,completed,setCompleted,submissions,setSubmissions,homeTitle,setHomeTitle,homeSubtitle,setHomeSubtitle,featured,setFeatured};
}
const ReadingContext=createContext<ReturnType<typeof useReadingState>|null>(null);
export function ReadingProvider({children}:{children:ReactNode}){const value=useReadingState();return <ReadingContext.Provider value={value}>{children}</ReadingContext.Provider>}
export function useReading(){const state=useContext(ReadingContext);if(!state)throw new Error('ReadingProvider is required');return state;}
