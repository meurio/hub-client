import graphql from './request-graphql';

window.fetch = jest.fn().mockResolvedValue({
  json: jest.fn()
});

describe('graphql function to called activists api', () => {
  const query: string = JSON.stringify({
    query: '',
    variables: {}
  });

  it('should make a post request for api', () => {
    return graphql(query)
      .then(() => {
        expect(window.fetch).toBeCalledWith(undefined, {
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          body: query
        });
      });
  });
});