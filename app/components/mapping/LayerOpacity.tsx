import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun as fasSun, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { faSun as farSun } from "@fortawesome/free-regular-svg-icons";

interface Props {
  opacity: number | undefined;
  handleChange: (newValue: string) => void;
  disabled: boolean;
  id: string;
}

const LayerOpacity = ({ opacity, handleChange, disabled, id }: Props) => {
  if (opacity || opacity === 0) {
    return (
      <div>
        <div className="flex space-x-2">
          <button>
            <FontAwesomeIcon
              icon={opacity === 0 ? farSun : fasSun}
              style={{ opacity: opacity === 0 ? 1 : (opacity ?? 0 + 0.2) }}
              onClick={() => {
                handleChange(opacity > 0 ? "0" : "100");
              }}
            />
          </button>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={opacity}
            onInput={({ target }) =>
              handleChange((target as HTMLInputElement).value)
            }
            className="cursor-ew-resize flex-grow accent-red-600/50"
            id={`opacity-${id}`}
            disabled={disabled}
          />
          <div className="">
            <input
              type="number"
              className="pl-2 text-right w-12 rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              max={100}
              min={0}
              step={5}
              value={Math.floor(opacity ?? 0)}
              onChange={({ target }) =>
                handleChange((target as HTMLInputElement).value)
              }
            />
            <span className="ml-1">%</span>
          </div>
        </div>
        <label
          htmlFor={`opacity-${id}`}
          className={`block ml-6 text-xs ${disabled ? "text-black/65" : "text-black"}`}
        >
          <span className="mr-1">Opacity</span>
        </label>
      </div>
    );
  }

  return (
    <div>
      <FontAwesomeIcon icon={faSpinner} spin /> Loading
    </div>
  );
};

export default LayerOpacity;
