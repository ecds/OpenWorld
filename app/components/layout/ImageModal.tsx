import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { Dispatch, SetStateAction } from "react";
import type { TOmekaImage, TTourImage } from "~/types";

interface Props {
  image: TOmekaImage | TTourImage;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<TOmekaImage | undefined>>;
}

const ImageModal = ({ image, isOpen, setIsOpen }: Props) => {
  const onClose = () => {
    setIsOpen(undefined);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[100] focus:outline-none"
      onClose={onClose}
      __demoMode
    >
      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-white max-w-3/4 max-h-[75vh] rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 relative overflow-hidden"
          >
            <DialogTitle as="div" className="flex mb-4">
              {/* TODO: Images really need to have titles */}
              <h2 className="flex-grow text-black/70">
                {image.title ?? image.caption}
              </h2>
              <button
                className="border border-black/70 px-2 rounded-md self-start"
                onClick={onClose}
              >
                <FontAwesomeIcon icon={faClose} />
                <span className="sr-only">Close content</span>
              </button>
            </DialogTitle>
            <img src={image.full} alt={image.caption} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ImageModal;
