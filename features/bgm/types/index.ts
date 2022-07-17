import { UseFormRegisterReturn } from "react-hook-form";

// Commons start.
export interface ItemAddFormProps {
  placeholder?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  onSubmit?: () => void;
}
// Commons end.

// Category start.
export interface CategoryAddForm {
  categoryName: string;
}
// Category end.

// Video start.
export interface VideoAddForm {
  videoName: string;
}
// Video end.
