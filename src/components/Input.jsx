//forwardref a hook used eg:- 
//take login page we are making a input common for both but a reference is need to be passed to
//login page input box hence used
import {React, useId,forwardRef} from 'react'

const Input= forwardRef(function Input({label,type="text",className='',...props},ref)
{ 
  const id=useId()
  return(
    <div className='w-full'>
            {label && <label 
            className='inline-block text-gray-800 mb-1 pl-1' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
  )
})
export default Input