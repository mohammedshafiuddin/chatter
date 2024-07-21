import "./App.css";
import {WsProivder} from "./components/ws-provider";
import ChatHome from "./pages/chat";

function App() {
  return (
    <>
      <WsProivder>
        <ChatHome />
      </WsProivder>
    </>
  );
}

export default App;
