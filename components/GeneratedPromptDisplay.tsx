// This component is no longer used. 
// Its functionality has been integrated into App.tsx for the new dual-prompt display.
// You can safely delete this file if it's not imported elsewhere.

// import React from 'react';
// import { ClipboardIcon } from '../constants';

// interface GeneratedPromptDisplayProps {
//   promptText: string;
//   onCopy: () => void;
//   isCopied: boolean;
// }

// const GeneratedPromptDisplay: React.FC<GeneratedPromptDisplayProps> = ({ promptText, onCopy, isCopied }) => {
//   if (!promptText) return null;

//   return (
//     <div className="mt-6 p-4 bg-slate-800 rounded-lg shadow">
//       <h3 className="text-lg font-semibold text-indigo-400 mb-2">Generated Veo 3 Prompt:</h3>
//       <div className="relative p-3 bg-slate-900 rounded-md">
//         <pre className="text-sm text-slate-200 whitespace-pre-wrap break-all">
//           {promptText}
//         </pre>
//         <button
//           onClick={onCopy}
//           className="absolute top-2 right-2 p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors"
//           aria-label="Copy prompt"
//         >
//           <ClipboardIcon className="w-4 h-4" />
//         </button>
//       </div>
//       {isCopied && (
//         <p className="mt-2 text-xs text-green-400">Copied to clipboard!</p>
//       )}
//     </div>
//   );
// };

// export default GeneratedPromptDisplay;
