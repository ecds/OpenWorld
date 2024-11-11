import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { OWA, Partners, Team } from "~/components/about";
import type { Dispatch, SetStateAction } from "react";

const tabs = ["OpenWorld Atlanta", "Partners", "Team"];

const panels = [OWA, Partners, Team];

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const AboutModal = ({ isOpen, setIsOpen }: Props) => {
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
            <DialogTitle as="h2" className="text-black/7 font-medium text-3xl">
              About
            </DialogTitle>
            <TabGroup className="overflow-auto h-full">
              <div className="w-full sticky top-0">
                <TabList className="flex gap-4 sticky top-0 h-12 bg-white">
                  {tabs.map((tab) => {
                    return (
                      <Tab
                        key={tab}
                        className="rounded-full py-1 text-sm/6 font-semibold focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                      >
                        {tab}
                      </Tab>
                    );
                  })}
                </TabList>
              </div>
              <TabPanels className="overflow-auto h-full">
                {panels.map((panel, index) => {
                  return (
                    <TabPanel
                      key={`panel-${tabs[index]}`}
                      className="rounded-xl bg-white/5 py-3 overflow-auto"
                    >
                      {panel}
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </TabGroup>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AboutModal;
