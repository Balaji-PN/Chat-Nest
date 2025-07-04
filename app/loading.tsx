"use client";

import { Flex, Box } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex>
      <Box
        className={`py-4 w-[100%] min-h-svh md:w-3/12 gap-6 dark:bg-zinc-900 px-2 rounded-sm flex flex-col`}
      >
        {/* UserBar Skeleton */}
        <Flex className="items-center justify-between p-2">
          <Flex className="items-center gap-2">
            <Box className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></Box>
            <Box className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></Box>
          </Flex>
          <Box className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></Box>
        </Flex>

        {/* GroupList Skeleton */}
        <Flex direction="column" gap="2" className="mt-4">
          <Box className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></Box>
          {[...Array(3)].map((_, i) => (
            <Flex key={i} className="items-center gap-2 p-2">
              <Box className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></Box>
              <Box className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></Box>
            </Flex>
          ))}
        </Flex>

        {/* ChatList Skeleton */}
        <Flex direction="column" gap="2" className="mt-4">
          <Box className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-2"></Box>
          {[...Array(5)].map((_, i) => (
            <Flex key={i} className="items-center gap-2 p-2">
              <Box className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></Box>
              <Box className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></Box>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box
        className={`min-h-svh w-[100%] md:w-9/12 gap-6 px-2 rounded-sm flex flex-col`}
      >
        {/* TopBar Skeleton */}
        <Flex className="items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-800 pb-4">
          <Box className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></Box>
          <Box className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></Box>
        </Flex>

        {/* Message Area Skeleton */}
        <Flex direction="column" gap="2" className="flex-grow p-2">
          {[...Array(7)].map((_, i) => (
            <Flex
              key={i}
              className={`items-start gap-2 ${
                i % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <Box
                className={`h-10 w-4/12 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse ${
                  i % 2 === 0 ? "ml-auto" : ""
                }`}
              ></Box>
            </Flex>
          ))}
        </Flex>

        {/* NewMsgForm Skeleton */}
        <Flex className="items-center gap-2 p-2 border-t border-gray-200 dark:border-gray-800 pt-4">
          <Box className="h-10 flex-grow bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></Box>
          <Box className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></Box>
        </Flex>
      </Box>
    </Flex>
  );
} 