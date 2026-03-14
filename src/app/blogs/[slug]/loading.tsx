import React from 'react'

const Loading = () => {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      {/* Back Button Skeleton */}
      <div className="h-6 w-32 bg-gray-300 dark:bg-neo-dark-gray rounded mb-8"></div>

      {/* Header Section */}
      <div className="mb-12">
        {/* Tags Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <div className="h-8 w-24 bg-gray-300 dark:bg-neo-dark-gray rounded-full"></div>
          <div className="h-8 w-24 bg-gray-300 dark:bg-neo-dark-gray rounded-full"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 space-y-3">
          <div className="h-12 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
          <div className="h-12 w-4/5 bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
        </div>

        {/* Date & Reading Time Skeleton */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div className="h-6 w-32 bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
          <div className="h-6 w-32 bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
        </div>

        {/* Author Info Skeleton */}
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-neo-dark-gray border-[3px] border-gray-300 dark:border-neo-dark-gray">
          <div className="w-16 h-16 bg-gray-300 dark:bg-neo-dark-gray rounded-full flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-6 w-32 bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
            <div className="h-4 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
          </div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div className="mb-12">
        <div className="w-full h-[400px] md:h-[500px] bg-gray-300 dark:bg-neo-dark-gray rounded border-[3px] border-gray-300 dark:border-neo-dark-gray"></div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="h-6 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
        <div className="h-6 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
        <div className="h-6 w-4/5 bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
        <div className="mt-6 space-y-3">
          <div className="h-6 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
          <div className="h-6 w-full bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-neo-dark-gray rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading
