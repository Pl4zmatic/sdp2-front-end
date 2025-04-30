"use client"

import { Trash2 } from "lucide-react"

interface DeleteConfirmationProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  highlightedText?: string
  isDeleting?: boolean
}

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  highlightedText,
  isDeleting = false,
}: DeleteConfirmationProps) {
  if (!isOpen) return null

  // If highlightedText is provided, replace it with styled version in the message
  const formattedMessage = highlightedText
    ? message.replace(highlightedText, `<span class="font-bold text-red-500">${highlightedText}</span>`)
    : message

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-40" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-50 bg-zinc-100 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-2 rounded-full">
              <Trash2 className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
        </div>

        <div className="p-5">
          <p className="text-gray-700 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: formattedMessage }} />
        </div>

        <div className="flex border-t border-gray-200 dark:border-gray-700 divide-x divide-gray-200 dark:divide-gray-700">
          <button
            onClick={onClose}
            className="flex-1 p-4 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 p-4 text-red-500 hover:bg-red-500/10 transition-colors font-medium flex justify-center items-center gap-2"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </>
  )
}
