import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import routes from './routes'
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RenderRoutes from './components/Routing/renderRoutes/renderRoutes';
import theme from './theme/index'
import { Provider as StoreProvider } from 'react-redux';
import configureStore from './store/configureStore';


function App() {
  const store = configureStore();
  const history = createBrowserHistory();
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <RenderRoutes routes={routes} />
        </Router>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
