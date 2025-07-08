"use client";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { languageOptions } from "@/config/config";

export type selectedLanguageOptionProps = {
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
};

export default function SelectLanguages({
  onSelect,
  selectedLanguageOption,
}: {
  onSelect: (value: selectedLanguageOptionProps) => void;
  selectedLanguageOption: selectedLanguageOptionProps;
}) {
  return (
    <Listbox value={selectedLanguageOption} onChange={onSelect}>
      {({ open }) => (
        <div className="relative">
          {/* Select Button */}
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
            <span className="ml-3 block truncate capitalize">
              {selectedLanguageOption.language} ({selectedLanguageOption.version})
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          {/* Dropdown Options */}
          <Transition
            show={open}
            as="div"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languageOptions.map((item) => (
                <Listbox.Option
                  key={item.language}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-3 pr-9 ${
                      active ? "bg-indigo-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <div className="flex items-center">
                      <span className={`ml-3 block truncate capitalize ${selected ? "font-semibold" : "font-normal"}`}>
                        {item.language} ({item.version})
                      </span>
                      {selected && (
                        <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-indigo-600"}`}>
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
}
