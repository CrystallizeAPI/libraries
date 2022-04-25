import { shallow } from 'enzyme';
import { Video } from '../../src/video';

describe('Video', () => {
    it('renders without crashing', () => {
        const cmp = shallow(<Video playlists={[]} />);
        expect(cmp).toHaveLength(1);
    });
});
