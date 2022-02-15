import { mocked } from 'ts-jest/utils';
import jwt from "jsonwebtoken";
import graphql from './request-graphql';
import pressure, { pressureQuery, Args } from './pressure';

jest.mock('./request-graphql');
const mockedGraphql = mocked(graphql);

jest.spyOn(global.console, 'log');

const jwtSpy = jest.spyOn(jwt, 'sign');

describe('activists module pressure tests', () => {
  const args: Args = {
    payload: {
      activist: {
        firstname: "Test",
        lastname: "Noname",
        email: "test@noname.org"
      },
      targets_id: 'rj',
      mail: {
        disableEditField: 's',
        subject: 'Subject',
        body: 'Body'
      }
    },
    widget: {
      id: 345
    }
  };
  const OLD_ENV = process.env;
  const SECRET_KEY = "token-de-teste";
  const token = jwt.sign({}, SECRET_KEY);

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
    process.env.ACTION_SECRET_KEY = SECRET_KEY;
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
    jest.clearAllMocks();
  });

  it('should make a query to called graphql api with input args', () => {
    mockedGraphql.mockResolvedValue({ data: { activist_pressure_id: 8576 } });
    jwtSpy.mockReturnValue(token);

    return pressure(args)
      .then(() => {
        const { email, firstname, lastname } = args.payload.activist;
        const expected: string = JSON.stringify({
          query: pressureQuery,
          variables: {
            activist: {
              first_name: firstname,
              last_name: lastname,
              name: `${firstname} ${lastname}`,
              email
            },
            widget_id: args.widget.id,
            input: { targets_id: args.payload.targets_id, token },
          } 
        });

        expect(mockedGraphql).toBeCalledWith(expected);
      });
  });

  it('should input city if preset in activist', () => {
    mockedGraphql.mockResolvedValue({ data: { activist_pressure_id: 8576 } });
    jwtSpy.mockReturnValue(token);
    const city = 'Belo Horizonte';
    
    return pressure({
      widget: args.widget,
      payload: { ...args.payload, activist: { ...args.payload.activist, city }}
    }).then(() => {
      const { email, firstname, lastname } = args.payload.activist;
      const expected: string = JSON.stringify({
        query: pressureQuery,
        variables: {
          activist: {
            first_name: firstname,
            last_name: lastname,
            name: `${firstname} ${lastname}`,
            email,
            city: city
          },
          widget_id: args.widget.id,
          input: { targets_id: args.payload.targets_id, token },
        }
      });

      expect(mockedGraphql).toBeCalledWith(expected);
    });
  });

  it('should log error in console browser', () => {
    const error = '500 Internal Server Error';
    mockedGraphql.mockRejectedValue(error);

    return pressure(args).then(() => {
      expect(global.console.log).toBeCalledTimes(1);
      expect(global.console.log).toBeCalledWith('err', error);
    });
  });
});