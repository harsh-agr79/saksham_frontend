import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FormFields = {
  InputField: ({ label, id, type, placeholder, required }) => (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full"
      />
    </div>
  ),

  TextAreaField: ({ label, id, placeholder, required }) => (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full"
      />
    </div>
  ),

  FileUpload: ({ label, id, onChange }) => (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </Label>
      <input
        type="file"
        id={id}
        accept="image/*"
        onChange={onChange}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
      />
    </div>
  ),
};

export default FormFields;
