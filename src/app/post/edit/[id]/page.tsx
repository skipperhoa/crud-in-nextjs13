"use client"
import React, {useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/app/libs'
import useSWR from 'swr'
export default function PostEdit({params} :{params:{id:number}}) {
  const router = useRouter()
  const {data : post,isLoading, error} = useSWR(`/api/posts/${params.id}`,fetcher)
  const [title, setTitle] =useState<string>('');
  const [body, setBody] = useState<string>('');
  useEffect(()=>{
     if(post){
         setTitle(post.result.title)
         setBody(post.result.content)
     }
  },[post, isLoading])
  const updatePost = async (e: any) => {
    e.preventDefault()
    if (title!="" && body!="") {
      const formData = {
          title: title,
          content: body
      }
      const res = await fetch(`/api/posts/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const content = await res.json();
      if(content.success>0)
      {
        router.push('/post');
      }
      
    }
  };
  if(isLoading) return <div><span>Loading...</span></div>
  if (!post) return null;
  return (
    <form className='w-full' onSubmit={updatePost}>
        <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Add</span>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Title</label>
             <input type='text' name='title' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' value={title} onChange={(e:any)=>setTitle(e.target.value)}/>
        </div>
        <div className='w-full py-2'>
             <label htmlFor="" className='text-sm font-bold py-2 block'>Content</label>
             <textarea name='title' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' value={body} onChange={(e:any)=>setBody(e.target.value)} />
        </div>
        <div className='w-full py-2'>
          <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
        </div>
    </form>
  )
}
