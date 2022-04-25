import { shallow } from 'enzyme';
import { ContentTransformer } from '../../src/content-transformer';

describe('Thing', () => {
    it('renders without crashing', () => {
        const cmp = shallow(<ContentTransformer />);
        expect(cmp).toHaveLength(1);
    });
});
