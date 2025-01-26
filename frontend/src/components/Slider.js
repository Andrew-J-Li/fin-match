import React, { useState } from "react";
import { Slider, SliderTrack, SliderThumb, SliderMark } from "@chakra-ui/react";

const Slider = () => {
  const [value, setValue] = useState(0);
  const notches = [0, 25, 50, 75, 100];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Slider with Notches</h2>
      <Slider
        value={value}
        onChange={(val) => setValue(val)}
        min={0}
        max={100}
        step={1}
      >
        <SliderTrack className="bg-gray-300 h-2 rounded">
          {notches.map((notch) => (
            <SliderMark
              key={notch}
              value={notch}
              className="bg-gray-700 h-4 w-1 rounded-sm absolute -translate-x-1/2 top-2"
            />
          ))}
        </SliderTrack>
        <SliderThumb className="bg-blue-500 h-4 w-4 rounded-full shadow-md" />
      </Slider>
      <p className="mt-4 text-center">Current Value: {value}</p>
    </div>
  );
};

export default Slider;