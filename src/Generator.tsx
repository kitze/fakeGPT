import React from "react";
import {Horizontal, ReactFC, Vertical} from "./Layout";
import {Logo} from "./Logo";
import {ChevronUpIcon, MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {
  BookOpenIcon,
  CheckCircleIcon,
  CursorArrowRippleIcon,
  TrashIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import {UseArray, useArray, UseBoolean, useBoolean, UseInput, useInput,} from "react-hanger";
import {ChooseAction} from "./ChooseAction";

type TW = ReactFC<{ className?: string }>;

const MessageText: TW = ({ children, className }) => {
  return (
    <Horizontal fullW className={`text-gray-50 ${className}`}>
      {children}
    </Horizontal>
  );
};

enum MessageFrom {
  Bot = "bot",
  User = "user",
}

const Message: ReactFC<{
  className?: string;
  from: MessageFrom;
  editMode?: UseBoolean;
}> = ({ className, editMode, from, children }) => {
  return (
    <Horizontal fullW className={`bg-grayOne  space-x-4 p-3 ${className}`}>
      {from === MessageFrom.Bot && <Logo onClick={editMode?.toggle} />}
      {from === MessageFrom.User && (
        <Vertical
          center
          className="bg-gray-100 rounded-sm p-1 h-[30px] w-[30px]"
          onClick={editMode?.toggle}
        >
          <UserCircleIcon />
        </Vertical>
      )}
      <MessageText>{children}</MessageText>
    </Horizontal>
  );
};

const UserMessage = ({ message, editMode }) => {
  return (
    <Message editMode={editMode} from={MessageFrom.User} className="bg-grayOne">
      <Editable message={message} />
    </Message>
  );
};

function FinishedBrowsing() {
  return (
    <Horizontal
      centerH
      className="rounded self-start bg-gray-300 text-gray-800 space-x-2 p-3"
    >
      <div>Finished browsing</div>
      <ChevronUpIcon className="w-4" />
    </Horizontal>
  );
}

export const botActions = [
  {
    id: "reading",
    label: "Reading content",
    Icon: BookOpenIcon,
    supportsContent: false
  },
  {
    id: "searched",
    label: "Searched",
    Icon: MagnifyingGlassIcon,
    supportsContent: true
  },
  {
    id: "clickedOn",
    label: "Clicked on",
    Icon: CursorArrowRippleIcon,
    supportsContent: true
  },
  {
    id: "finishedBrowsing",
    label: "Finished browsing",
    Icon: CheckCircleIcon,
    supportsContent: false
  },
];

const BotAction: ReactFC<any> = ({ action, children }) => {
  const { Icon } = action;
  return (
    <Horizontal centerH className="space-x-3">
      <Icon className="w-4" />
      <div>
        {action.label}
        {children ? ":" : ""}
      </div>
      {children && (
        <div className="p-1 px-1.5 bg-white rounded text-sm">{children}</div>
      )}
    </Horizontal>
  );
};

const BotActions: ReactFC<{
  actions: UseArray<BotAction>;
  editMode: UseBoolean;
}> = ({ actions, editMode }) => {
  return (
    <Vertical
      fullW
      className="p-3 bg-gray-300 text-gray-800 rounded space-y-2 w-full max-w-lg"
    >
      {actions.value.map((action) => {
        const foundAction = botActions.find((a) => a.id === action.actionId);
        return (
          <Horizontal key={action.id} className="space-x-3">
            {editMode.value && (
              <TrashIcon
                onClick={() => {
                  console.log("removing", action.id);
                  actions.removeIndex(
                    actions.value.findIndex((a) => a.id === action.id)
                  );
                }}
                className="w-3"
              />
            )}
            <BotAction action={foundAction} key={foundAction.label}>
              {action.text}
            </BotAction>
          </Horizontal>
        );
      })}
    </Vertical>
  );
};

const Editable: ReactFC<{ message: UseInput }> = ({ message }) => {
  const editing = useBoolean(false);
  const isEditing = true;

  return (
    <Vertical fullW className="p3" onClick={editing.setTrue}>
      <textarea
        spellCheck={false}
        className="bg-transparent w-full outline-gray-300 resize-none"
        {...message.eventBind}
        onBlur={editing.setFalse}
      />
    </Vertical>
  );
};

const BotMessage = ({ actions, addAction, editMode, message }) => {
  return (
    <Message editMode={editMode} from={MessageFrom.Bot} className="bg-grayTwo">
      <Vertical fullW className="space-y-3 ">
        <Vertical fullW className="space-y-3">
          <FinishedBrowsing />
          {actions.value.length > 0 && (
            <BotActions editMode={editMode} actions={actions} />
          )}
          {addAction}
        </Vertical>
        <Editable message={message} />
      </Vertical>
    </Message>
  );
};

type BotAction = {
  id: string;
  actionId: string;
  text: string;
};

export const Generator = () => {
  const actions = useArray<BotAction>([]);
  const editMode = useBoolean(true);
  const adding = useBoolean(false);

  const userMessage = useInput("Click here to edit this message");
  const botAnswer = useInput("Click here to edit the bot's answer");

  const addAction = ({ actionId, text }) => {
    const randomId = Math.random().toString(36).substring(7);
    actions.push({
      id: randomId,
      actionId,
      text,
    });
    adding.setFalse();
  };

  return (
    <Vertical className="space-y-2" fullW>
      {editMode.value && (
        <Vertical className="space-y-2">
          <div className="text-xs p-3 text-gray-300 max-w-lg text-center m-auto">
            This tool allows you to create a fake screenshot of ChatGPT visiting
            a website, reading content, etc. It's mostly made for memes and
            lulz. <br /> <br /> You are currently in edit mode, if you want to
            take a screenshot without editing UI elements, tap the chatGPT logo
            and they will disappear.
          </div>
        </Vertical>
      )}
      {adding.value && (
        <Vertical center fullW className="p-5">
          <ChooseAction onCancel={adding.setFalse} onSubmit={addAction} />
        </Vertical>
      )}
      <UserMessage editMode={editMode} message={userMessage} />
      <BotMessage
        addAction={
          <button
            className="btn btn-sm self-start btn-primary"
            onClick={adding.setTrue}
          >
            Add bot action
          </button>
        }
        editMode={editMode}
        actions={actions}
        message={botAnswer}
      />
    </Vertical>
  );
};
