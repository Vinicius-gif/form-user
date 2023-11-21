'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(3, { message: 'O campo deve conter 3 caracteres' }).max(50),
  document: z.string(),
  email: z.string().email('Email é inválido'),
  initialDate: z.string(),
  finalDate: z.string()
})
.superRefine((fields, ctx) => {
  if (fields.initialDate && !fields.finalDate) {
    ctx.addIssue({
      path: ['finalDate'],
      code: z.ZodIssueCode.invalid_date,
      message: 'Selecione uma data final'
    })
  }

  if ( new Date (fields.initialDate).getTime() > new Date(fields.finalDate).getTime()) {
    ctx.addIssue({
      path: ['finalDate'],
      code: z.ZodIssueCode.invalid_date,
      message: 'A data final deve ser maior do que a data inicial'
    })
  }
})

type FormData = z.infer<typeof schema>

const Form = () => {
  const { handleSubmit, register, formState: {errors} } = useForm<FormData>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  });

  return (
    <div className="flex w-full flex-col items-center">
    <h2 className="text-2xl font-bold text-slate-600">Use Filter</h2>

    <form 
      onSubmit={handleSubmit((data) => console.log(data))}
      className='mt-3 flex w-full max-w-lg flex-col gap-2'
      >
        <div className='flex w-full flex-col'>
          <input 
            {...register('name')} 
            className='rounded-md px-3 py-1' 
            placeholder='Name'
            />
          {errors.name && (
            <p className='text-red-500'>{errors.name.message}</p>
            )}
          </div>

          <div className='flex w-full flex-col'>
            <input 
              {...register('document')} 
              className='rounded-md px-3 py-1' 
              placeholder='document' 
              />
            {errors.document && (
              <p className='text-red-500'>{errors.document.message}</p>
              )}
          </div>

          <div className='flex w-full flex-col'>
            <input 
              {...register('email')} 
              className='rounded-md px-3 py-1' 
              placeholder='Email' 
              />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}
          </div>
        

      <div className='flex gap-2'>
        <div className='flex w-full flex-col'>
          <input 
            {...register('initialDate')} 
            type='date' 
            className='rounded-md px-3 py-1' 
          />
          {errors.initialDate && (
            <p className='text-red-500'>{errors.initialDate.message}</p>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <input 
            {...register('finalDate')} 
            type='date' 
            className='rounded-md px-3 py-1' 
          />
          {errors.finalDate && (
            <p className='text-red-500'>{errors.finalDate.message}</p>
          )}
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