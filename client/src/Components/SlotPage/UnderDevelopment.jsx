import React from "react";

const UnderDevelopment = ({ featureName }) => (
  <div className="flex flex-col items-center justify-center py-20 px-4 text-center min-h-[60vh] bg-white dark:bg-gray-900">
    <div className="text-6xl mb-6 text-gray-300 dark:text-gray-600">🚧</div>
    <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
      {featureName} is Coming Soon
    </h1>
    <p className="text-gray-600 dark:text-gray-400 max-w-md">
      We’re working hard to bring you this feature. Stay tuned!
    </p>
  </div>
);

export default UnderDevelopment;
