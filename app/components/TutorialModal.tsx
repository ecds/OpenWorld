import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Carousel } from "nuka-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { Dispatch, SetStateAction } from "react";

const slides = [
  "Slide2.jpg",
  "Slide3.jpg",
  "Slide4.jpg",
  "Slide5.jpg",
  "Slide6.jpg",
  "Slide7.jpg",
];

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const TutorialModal = ({ isOpen, setIsOpen }: Props) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[100] focus:outline-none"
      onClose={setIsOpen}
      __demoMode
    >
      <div className="fixed inset-0 z-10 w-screen">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-white w-3/4 h-[75vh] rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 relative overflow-hidden"
          >
            <DialogTitle as="div" className="flex">
              <h2 className="text-black/7 font-medium text-3xl flex-grow">
                How to Use
              </h2>
              <button
                className="border border-black/70 px-2 rounded-md self-start"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faClose} />
                <span className="sr-only">Close content</span>
              </button>
            </DialogTitle>
            <Carousel showArrows>
              <>
                {slides.map((slide) => {
                  return (
                    <img
                      key={slide}
                      src={`/images/tutorials/${slide}`}
                      alt=""
                    />
                  );
                })}
              </>
            </Carousel>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default TutorialModal;
