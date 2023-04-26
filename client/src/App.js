import { Home , Landing , Detail , Form } from "./views";
import { Route} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
      <Route path="/home/:id" component={Detail}/>
      <Route exact path="/create" component={Form}/>
    </div>
  );
}

export default App;
