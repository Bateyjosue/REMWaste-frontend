export default function Skeleton() {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Hero Section Skeleton */}
      <div className='text-center mb-16'>
        <div className='inline-block h-8 bg-slate-200 dark:bg-slate-700 rounded-full w-48 mb-6 animate-pulse'></div>
        <div className='space-y-4 mb-6'>
          <div className='h-12 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 mx-auto animate-pulse'></div>
          <div className='h-12 bg-slate-200 dark:bg-slate-700 rounded-lg w-1/2 mx-auto animate-pulse'></div>
        </div>
        <div className='space-y-2'>
          <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/3 mx-auto animate-pulse'></div>
          <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto animate-pulse'></div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16'>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className='bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse'
          >
            {/* Image Skeleton */}
            <div className='h-48 bg-slate-200 dark:bg-slate-700 relative'>
              <div className='absolute bottom-4 left-4 w-20 h-12 bg-slate-300 dark:bg-slate-600 rounded-xl'></div>
            </div>
            
            {/* Content Skeleton */}
            <div className='p-6'>
              <div className='flex justify-between items-start mb-4'>
                <div className='space-y-2'>
                  <div className='h-6 bg-slate-200 dark:bg-slate-700 rounded w-32'></div>
                  <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-24'></div>
                </div>
                <div className='text-right space-y-1'>
                  <div className='h-8 bg-slate-200 dark:bg-slate-700 rounded w-16'></div>
                  <div className='h-3 bg-slate-200 dark:bg-slate-700 rounded w-12'></div>
                </div>
              </div>
              
              {/* Features Skeleton */}
              <div className='space-y-2 mb-6'>
                {[1, 2, 3].map((j) => (
                  <div key={j} className='flex items-center'>
                    <div className='w-4 h-4 bg-slate-200 dark:bg-slate-700 rounded mr-2'></div>
                    <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded flex-1'></div>
                  </div>
                ))}
              </div>
              
              {/* Button Skeleton */}
              <div className='h-12 bg-slate-200 dark:bg-slate-700 rounded-xl'></div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Indicators Skeleton */}
      <div className='text-center mt-16 pt-8 border-t border-slate-200 dark:border-slate-700'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex flex-col items-center animate-pulse'>
              <div className='w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-xl mb-3'></div>
              <div className='h-5 bg-slate-200 dark:bg-slate-700 rounded w-32 mb-2'></div>
              <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-24'></div>
            </div>
          ))}
        </div>
        <div className='mt-8 space-y-2'>
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mx-auto'></div>
          <div className='h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mx-auto'></div>
        </div>
      </div>
    </div>
  )
}