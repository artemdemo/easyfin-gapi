import React from 'react';
import renderer from 'react-test-renderer';
import AppView from '../components/AppView';

jest.mock('../../components/Icon/Icon');
jest.mock('../../components/Button/Button');
jest.mock('../../containers/MainMenu/MainMenu');
jest.mock('../../history');

describe('<AppView>', () => {
    const historyMock = require('../../history');

    it('Simple render', () => {
        const tree = renderer.create(
            <AppView />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('Render with children', () => {
        const tree = renderer.create(
            <AppView>
                Children
            </AppView>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
