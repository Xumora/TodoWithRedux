import { Provider } from 'react-redux';
import Todo from './Containers/Todo/Todo';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{ backgroundColor: "#161729", minHeight: "100vh" }}>
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-sm-10 col-md-8 col-lg-6">
              <Todo />
            </div>
          </div>
        </div>
      </div>
    </Provider>

  );
}

export default App;