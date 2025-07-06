import { ToastPosition } from "react-toastify";

type ToastVariant = "success" | "failure";

export interface ShowToastProps {
  message: string;
  variant?: ToastVariant;
  position?: ToastPosition;
}
