import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import { store } from './redux/store';

const rooteEelement = document.getElementById('root');

if (rooteEelement) {
  const root = ReactDOM.createRoot(rooteEelement);
  
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

