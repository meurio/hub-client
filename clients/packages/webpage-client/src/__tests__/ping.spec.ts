import '@testing-library/jest-dom/extend-expect';

import ping from '../pages/api/ping';

describe('ping', () => {
    const mockJson = jest.fn();
    const mockRes = {
      status: jest.fn().mockImplementation(() => ({
        json: mockJson
      }))
    }
    const wrapper = ping({},mockRes);

    it('should call  with text', () => {
        console.log(wrapper);
        // expect(wrapper).toBeTruthy();
        expect(mockRes.status.mock.calls[0][0]).toEqual(200);
        expect(mockJson.mock.calls[0][0]).toEqual({ });

    });
});