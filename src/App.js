import './App.css';
import { ThemeProvider } from '@material-ui/styles';
import routes from './routes'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RenderRoutes from './components/Routing/renderRoutes/renderRoutes';
import theme from './theme/index'
function App() {
  const history = createBrowserHistory();
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <RenderRoutes routes={routes} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
