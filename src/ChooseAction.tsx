import React from "react";
import { useInput } from "react-hanger";
import { botActions } from "./Generator";
import { Horizontal, Vertical } from "./Layout";

export const ChooseAction = ({ onSubmit, onCancel }) => {
  const content = useInput("");
  const selectedAction = useInput("searched");

  const clearForm = () => {
    content.setValue("");
    selectedAction.setValue("searched");
  };

  const foundAction = botActions.find(
    (action) => action.id === selectedAction.value
  );

  const selectedActionSupportsContent = foundAction?.supportsContent;

  return (
    <Vertical className="space-y-3 rounded p-1 bg-gray-700 p-4" center fullW>
      <div className="text-xl">Choose action</div>
      <select className="select w-full max-w-xs" {...selectedAction.eventBind}>
        {botActions.map((action) => (
          <option value={action.id}>{action.label}</option>
        ))}
      </select>
      {selectedActionSupportsContent && (
        <input
          placeholder="Content of the action..."
          className="input w-full"
          {...content.eventBind}
        />
      )}

      <Horizontal fullW className="justify-end space-x-2">
        <button
          className="btn btn-sm"
          onClick={() => {
            onCancel?.();
            clearForm();
          }}
        >
          cancel
        </button>

        <button
          className="btn btn-sm btn-primary"
          onClick={() => {
            onSubmit({
              actionId: selectedAction.value,
              text: content.value,
            });
            clearForm();
          }}
        >
          add
        </button>
      </Horizontal>
    </Vertical>
  );
};
