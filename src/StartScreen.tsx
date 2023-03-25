import React from "react";
import { Vertical } from "./Layout";

export const StartScreen = ({ onStart }) => {
  return (
    <Vertical center className="space-y-5 h-screen ">
      <Vertical center>
        <div className="text-3xl text-white">fakeGPT</div>
        <a className="text-gray-400" href="https://twitter.com/thekitze">
          by @thekitze
        </a>
      </Vertical>
      <button
        onClick={onStart}
        className="btn btn-primary"
      >
        Create a conversation
      </button>
    </Vertical>
  );
};
