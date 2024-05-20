import { createRoot } from 'react-dom/client';

import TodoApp from './components/TodoApp/TodoApp';

const container = document.getElementById('root');
const rootInstance = createRoot(container);

rootInstance.render(<TodoApp />);
