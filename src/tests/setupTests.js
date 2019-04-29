import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DotEnv from 'dotenv';

// Brings in the variables from .env.test so they're accessible to us here
DotEnv.config({ path: '.env.test' });

Enzyme.configure({
    adapter: new Adapter()
});