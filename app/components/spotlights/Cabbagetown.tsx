import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "@remix-run/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Cabbagetown = ({ isOpen, setIsOpen }: Props) => {
  const navigate = useNavigate();

  const close = () => {
    setIsOpen(false);
    navigate("/");
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-[100] focus:outline-none"
      onClose={close}
      __demoMode
    >
      <div className="fixed inset-0 z-10 w-screen pointer-events-none">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="bg-white-true w-[85vw] h-[85vh] rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 relative overflow-hidden pointer-events-auto"
          >
            <div className="flex flex-row-reverse w-full">
              <div className="self-start">
                <button
                  className="border border-black/70 px-2 rounded-md self-start"
                  onClick={close}
                >
                  <FontAwesomeIcon icon={faClose} />
                  <span className="sr-only">Close content</span>
                </button>
              </div>
              <DialogTitle
                as="h2"
                className="flex-grow text-black/7 font-medium text-3xl pb-4"
              >
                Cabbagetown: An Atlanta Neighborhood in the 1920s
              </DialogTitle>
            </div>
            <iframe
              title="Cabbagetown: An Atlanta Neighborhood in the 1920s"
              src="https://storymaps.arcgis.com/stories/ee518f7717304be08af934b2dcdae022"
              allowFullScreen
              className="h-full w-full"
            ></iframe>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Cabbagetown;
