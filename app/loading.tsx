"use client";

export default function Loading() {
  return (
    <div className="flex">
      <div
        className={`py-4 w-[100%] min-h-svh md:w-3/12 gap-6 dark:bg-zinc-900 px-2 rounded-sm flex flex-col`}
      >
        {/* UserBar Skeleton */}
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        {/* GroupList Skeleton */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* ChatList Skeleton */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 p-2">
              <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`min-h-svh w-[100%] md:w-9/12 gap-6 px-2 rounded-sm flex flex-col`}
      >
        {/* TopBar Skeleton */}
        <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Message Area Skeleton */}
        <div className="flex flex-col gap-2 flex-grow p-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                i % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`h-10 w-4/12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse ${
                  i % 2 === 0 ? "ml-auto" : ""
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* NewMsgForm Skeleton */}
        <div className="flex items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-800 pt-4">
          <div className="h-10 flex-grow bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
} 