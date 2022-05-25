import '@testing-library/jest-dom/extend-expect';

import ping from './ping';

describe('ping', () => {
    const wrapper = ping();

    it('should call  with text', () => {
        console.log(wrapper);
        expect(wrapper).toBeTruthy();
        expect(wrapper).toEqual({});
    });
});