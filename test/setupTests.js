import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.console = {
  warn: jest.fn(),
  log: jest.fn(),
  error: jest.fn()
};

