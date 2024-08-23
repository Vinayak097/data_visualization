import React from 'react'

function Loading() {
  return (
    
        <div class=" itmc border-blue-300 shadow rounded-md p-2  w-full ">
  <div class="animate-pulse flex space-x-4 ">
    {/* <div class="rounded-full bg-slate-700 h-16 w-16"></div> */}
    <div class="flex-1 space-y-6 py-1">
      <div class="h-6 w-96 bg-slate-500 rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-6 w-[100px] bg-slate-500 rounded col-span-1"></div>
          <div class="h-4 w-24 bg-slate-500 rounded col-span-1"></div>
        </div>
        <div class="mt-[300px] h-[500px] w-full bg-slate-500 rounded"></div>
      </div>
    </div>
  </div>
</div>

    
  )
}

export default Loading