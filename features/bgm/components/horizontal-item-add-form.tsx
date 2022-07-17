import { ItemAddFormProps } from "@/features/bgm/types";

export default function HorizontalItemAddForm({
  onSubmit,
  placeholder,
  register,
  error,
}: ItemAddFormProps) {
  return (
    <div className="w-full px-10 py-5">
      {/* Form */}
      <form
        className="relative flex items-center border rounded-md overflow-hidden"
        onSubmit={onSubmit}
      >
        <input
          className="grow px-4 py-2 outline-none tracking-wider"
          type="text"
          placeholder={placeholder || "Enter input"}
          {...register}
        />
        <button className="absolute bg-white right-0 p-2 border-l hover:bg-indigo-400 hover:text-white transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </form>

      {/* Error */}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}
