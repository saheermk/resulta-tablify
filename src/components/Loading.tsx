import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent p-4 z-50">
      <motion.div
        className="w-full max-w-lg space-y-6 p-8 rounded-2xl bg-gray-100/40 flex flex-col items-center"
      >
        {/* Header Skeleton */}
        <motion.div
          className="h-10 w-3/5 bg-gray-200 rounded-md"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="h-6 w-4/5 bg-gray-200 rounded-md mb-8"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Input Skeletons */}
        <motion.div
          className="h-14 w-full bg-gray-200 rounded-2xl mb-4"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
        <motion.div
          className="h-14 w-full bg-gray-200 rounded-2xl mb-4"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.3, repeat: Infinity }}
        />

        {/* Button Skeleton */}
        <motion.div
          className="h-14 w-2/4 bg-gray-200 rounded-2xl mt-2"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}
