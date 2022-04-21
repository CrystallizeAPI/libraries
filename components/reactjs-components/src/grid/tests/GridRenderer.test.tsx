import { shallow } from 'enzyme';
import { GridRenderer } from '../GridRenderer';
import { GridRenderingType } from '../types';
import { CellComponent, model } from './utils';

describe('GridRenderer', () => {
    it('renders a grid correctly', () => {
        const wrapper = shallow(
            <GridRenderer grid={model} cellComponent={CellComponent} type={GridRenderingType.Table} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('renders a table correctly', () => {
        const wrapper = shallow(
            <GridRenderer grid={model} cellComponent={CellComponent} type={GridRenderingType.Table} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it('passes the `cellComponent` prop through correctly', () => {
        const wrapper = shallow(
            <GridRenderer grid={model} cellComponent={CellComponent} type={GridRenderingType.Table} />
        );
        expect(wrapper.find('CSSGrid').prop('cellComponent')).toEqual(CellComponent);
    });

    it('passes the children through correctly', () => {
        // The children should be a function as per the prop types
        const mock = jest.fn();
        const wrapper = shallow(
            <GridRenderer grid={model} cellComponent={CellComponent} type={GridRenderingType.Table}>
                {mock}
            </GridRenderer>
        );
        expect(wrapper.find('CSSGrid').prop('children')).toEqual(mock);
    });

    it('should allow custom props to be passed through to the grid component', () => {
        const wrapper = shallow(
            <GridRenderer
                className="my-custom-class"
                grid={model}
                cellComponent={CellComponent}
                type={GridRenderingType.Div}
            />
        );
        expect(wrapper.find('CSSGrid').prop('className')).toEqual('my-custom-class');
    });
});
