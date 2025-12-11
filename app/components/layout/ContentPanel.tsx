import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import type { ReactNode, Dispatch, SetStateAction } from "react";

interface Props {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  showButton?: string;
}

const ContentPanel = ({
  children,
  title,
  isOpen,
  setIsOpen,
  showButton,
}: Props) => {
  return (
    <>
      <div
        className={`absolute h-screen overflow-auto bg-white/80 top-0 right-0 w-1/4 z-50 transition-transform duration-700 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div
          className={`flex flex-row-reverse w-full sticky top-0 p-4 bg-white shadow-md`}
        >
          <button
            className="border border-black/70 px-2 rounded-md self-start"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faClose} />
            <span className="sr-only">Close content</span>
          </button>
          <h1 className="flex-grow text-2xl text-black/90">{title}</h1>
        </div>
        <div className="p-4">{children}</div>
      </div>
      <button
        className={`absolute bg-accent/80 text-white px-3 py-1 rounded-md top-4 right-6 w-auto z-50 transition-transform duration-700 ${isOpen ? "translate-x-[150%]" : "translate-x-0"}`}
        onClick={() => setIsOpen(true)}
      >
        {showButton ?? `Show ${title}`}
      </button>
    </>
  );
};

export default ContentPanel;
