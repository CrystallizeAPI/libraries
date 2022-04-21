import { shallow } from 'enzyme';
import { Table } from '../Table';
import { CellComponent, model } from './utils';

const { rows } = model;

describe('Table', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Table cellComponent={CellComponent} rows={rows} />);
        const cells = wrapper.find(CellComponent);
        expect(cells).toHaveLength(3);
        expect(cells.first().prop('cell')).toEqual(rows[0].columns[0]);
    });
});
