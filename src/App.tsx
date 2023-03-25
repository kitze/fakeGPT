import { StartScreen } from "./StartScreen";
import { useBoolean } from "react-hanger";
import { Generator } from "./Generator";
import {Vertical} from "./Layout";

function App() {
  const started = useBoolean(false);

  return (
    <Vertical center className="App bg-grayTwo">
      {!started.value && <StartScreen onStart={started.setTrue} />}
      {started.value && <Generator />}
    </Vertical>
  );
}

export default App;
