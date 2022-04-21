import { shallow } from 'enzyme';
import { CSSGrid } from '../CSSGrid';
import { CellComponent, model, toCells } from './utils';

const { rows } = model;
const cells = toCells(rows);

describe('CSSGrid', () => {
    describe('when the `cellComponent` prop is given', () => {
        it('renders the custom component for each cell', () => {
            const wrapper = shallow(<CSSGrid cellComponent={CellComponent} cells={cells} />);
            const cellComponents = wrapper.find(CellComponent);
            expect(cellComponents).toHaveLength(3);
            expect(cellComponents.first().prop('cell')).toEqual(rows[0].columns[0]);
        });
    });
});
