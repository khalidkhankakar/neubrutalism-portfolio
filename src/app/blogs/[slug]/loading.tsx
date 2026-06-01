import React from 'react'

const Loading = () => {
  return (
    <div className="editorial-shell min-h-screen px-[var(--page-gutter)] py-[var(--space-3xl)]">
      <div className="editorial-container animate-pulse">
        <div className="mb-8 h-4 w-32 bg-[var(--color-paper-3)]"></div>

        <div className="mb-12">
          <div className="mb-6 flex flex-wrap gap-3">
            <div className="h-4 w-24 bg-[var(--color-paper-3)]"></div>
            <div className="h-4 w-24 bg-[var(--color-paper-3)]"></div>
          </div>

          <div className="mb-6 space-y-3">
            <div className="h-16 w-full bg-[var(--color-paper-3)] md:h-24"></div>
            <div className="h-16 w-4/5 bg-[var(--color-paper-3)] md:h-24"></div>
          </div>

          <div className="mb-8 flex flex-wrap items-center gap-6">
            <div className="h-4 w-32 bg-[var(--color-paper-3)]"></div>
            <div className="h-4 w-32 bg-[var(--color-paper-3)]"></div>
          </div>

          <div className="flex items-center gap-4 border-y border-[var(--color-rule)] py-4">
            <div className="size-16 flex-shrink-0 bg-[var(--color-paper-3)]"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-[var(--color-paper-3)]"></div>
              <div className="h-4 w-full bg-[var(--color-paper-3)]"></div>
              <div className="h-4 w-full bg-[var(--color-paper-3)]"></div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <div className="h-[320px] w-full border border-[var(--color-rule)] bg-[var(--color-paper-3)] md:h-[520px]"></div>
        </div>

        <div className="mx-auto max-w-[72ch] space-y-4">
          <div className="h-5 w-full bg-[var(--color-paper-3)]"></div>
          <div className="h-5 w-full bg-[var(--color-paper-3)]"></div>
          <div className="h-5 w-4/5 bg-[var(--color-paper-3)]"></div>
          <div className="mt-6 space-y-3">
            <div className="h-5 w-full bg-[var(--color-paper-3)]"></div>
            <div className="h-5 w-full bg-[var(--color-paper-3)]"></div>
            <div className="h-5 w-3/4 bg-[var(--color-paper-3)]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
