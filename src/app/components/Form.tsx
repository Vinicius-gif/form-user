'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  document: z.string(),
  email: z.string().email('Email é inválido'),
  initialDate: z.string(),
  finalDate: z.string()
})

type FormData = z.infer<typeof schema>

const Form = () => {
  const { handleSubmit, register, formState: {errors} } = useForm<FormData>({
    mode: 'onBlur'
  });

  console.log(errors);

  return (
    <div className="flex w-full flex-col items-center">
    <h2 className="text-2xl font-bold text-slate-600">Use Filter</h2>

    <form 
      onSubmit={handleSubmit((data) => console.log(data))}
      className='mt-3 flex w-full max-w-lg flex-col gap-2'
      >
        <input 
          {...register('name')} 
          className='rounded-md px-3 py-1' 
          placeholder='Name' 
        />
        <input 
          {...register('document')} 
          className='rounded-md px-3 py-1' 
          placeholder='Document' 
        />
        <input 
          {...register('email')} 
          className='rounded-md px-3 py-1' 
          placeholder='Email' 
        />

      <div className='flex gap-2'>
        <div className='flex w-full flex-col'>
          <input 
            {...register('initialDate')} 
            type='date' 
            className='rounded-md px-3 py-1' 
          />
        </div>
        <div className='flex w-full flex-col'>
          <input 
            {...register('finalDate')} 
            type='date' 
            className='rounded-md px-3 py-1' 
          />
        </div>
      </div>

      <button
        type='submit'
        className='mt-2 rounded-md bg-purple-500 p-2 text-slate-100 hover:cursor-pointer'
      >
        Filter
      </button>
    </form>
   </div>
  )
}

export default Form