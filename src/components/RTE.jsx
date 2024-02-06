import React from 'react'
import {Editor} from '@tinymce/tinymce-react';

import{Controller}from 'react-hook-form'

export default function RTE({name,control,label,defaultValue=""}) {
  return (
    /*<Editor
    initialValue='default value'
    init={
        {branding:false,
        height:500,
    menubar:true,
plugins:[
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste help wordcount"
  ],
  toolbar:
  "undo redo | styleselect | bold italic | alignleft aligncenter alignright align   center aligncente'   

}
    }>

    </Editor>*/


  <div className='w-full'>
    {label && <label className='text-sm text-gray-600'>{label}</label>}


    <Controller
    name={name || "content"}
    control={control}
    render={({field:{onChange}})=>(<Editor/>)}/>
  </div>
  
    )
}


