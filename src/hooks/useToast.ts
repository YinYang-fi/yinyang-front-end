import { useMemo } from 'react'
import { toast } from 'react-toastify';

const TOAST_DURATION = 5000

// Toasts
export const useToast = () => {
  const helpers = useMemo(() => {
    return {
      error: (message: string | HTMLElement) => {
        return toast.error(message, { autoClose: TOAST_DURATION, position: "bottom-left" })
      },
      info: (message: string | HTMLElement) => {
        return toast.info(message, { autoClose: TOAST_DURATION, position: "bottom-left" })
      },
      success: (message: string | HTMLElement) => {
        return toast.success(message, { autoClose: TOAST_DURATION, position: "bottom-left" })
      },
      warning: (message: string | HTMLElement) => {
        return toast.warning(message, { autoClose: TOAST_DURATION, position: "bottom-left" })
      },
    }
  }, [])

  return helpers
}
