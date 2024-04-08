import { createRoot } from 'react-dom/client';

import App from './components/app/app';

const container = document.getElementById('root');
const rootInstance = createRoot(container);

rootInstance.render(<App />);
