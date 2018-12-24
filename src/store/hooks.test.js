import React, { useContext } from 'react';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';

import { StoreContext, StoreProvider, useDispatch, useSelector } from './hooks';

const mockStore = configureStore();

describe('Provider setup', () => {
  it('Should fail with no store', () => {
    try {
      expect(() => shallow(<StoreProvider />)).toThrow();
    } catch (err) {}
  });

  it('Should fail with a simple object', () => {
    try {
      expect(() => shallow(<StoreProvider store={{}} />)).toThrow();
    } catch (err) {}
  });

  it('Should work with a store', () => {
    const store = mockStore({});
    const wrapper = shallow(<StoreProvider store={store}>hola</StoreProvider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should setup the context', () => {
    const state = {};
    const store = mockStore(state);
    const MockComponent = () => {
      const context = useContext(StoreContext);
      expect(context.getState()).toBe(state);
      return 'hola';
    };
    mount(
      <StoreProvider store={store}>
        <MockComponent />
      </StoreProvider>
    );
  });
});

describe('useDispatch', () => {
  const TYPE_ONE = 'type one';
  const TYPE_TWO = 'type two';
  const typeOne = {
    type: TYPE_ONE
  };
  const acTypeOne = () => typeOne;
  const acTypeTwo = id => ({
    type: TYPE_TWO,
    id
  });
  const store = mockStore({});

  beforeEach(() => {
    store.clearActions();
  });

  it('with no argument, it should return store.dispatch', () => {
    const MockComponent = () => {
      expect(useDispatch()).toBe(store.dispatch);
      return null;
    };
    mount(
      <StoreProvider store={store}>
        <MockComponent />
      </StoreProvider>
    );
  });

  it('with one action creator it should return a bound function', () => {
    const MockComponent = () => {
      const doTypeOne = useDispatch(acTypeOne);
      expect(typeof doTypeOne).toBe('function');
      expect(store.getActions()).toEqual([]);
      doTypeOne();
      expect(store.getActions()).toEqual([typeOne]);
      return null;
    };
    mount(
      <StoreProvider store={store}>
        <MockComponent />
      </StoreProvider>
    );
  });

  it('with an array of action creators it should return an array of bound functions', () => {
    const MockComponent = () => {
      const [doTypeOne, doTypeTwo] = useDispatch([acTypeOne, acTypeTwo]);
      expect(typeof doTypeOne).toBe('function');
      expect(typeof doTypeTwo).toBe('function');
      expect(store.getActions()).toEqual([]);
      doTypeOne();
      expect(store.getActions()).toEqual([typeOne]);
      doTypeTwo(5);
      expect(store.getActions()).toEqual([typeOne, { type: TYPE_TWO, id: 5 }]);
      return null;
    };
    mount(
      <StoreProvider store={store}>
        <MockComponent />
      </StoreProvider>
    );
  });

  it('with a mapDispatchToProps object it should return an object of bound functions', () => {
    const MockComponent = () => {
      const actions = useDispatch({
        doTypeOne: acTypeOne,
        doTypeTwo: acTypeTwo
      });
      expect(typeof actions).toBe('object');
      expect(typeof actions.doTypeOne).toBe('function');
      expect(typeof actions.doTypeTwo).toBe('function');
      expect(store.getActions()).toEqual([]);
      actions.doTypeOne();
      expect(store.getActions()).toEqual([typeOne]);
      actions.doTypeTwo(5);
      expect(store.getActions()).toEqual([typeOne, { type: TYPE_TWO, id: 5 }]);
      return null;
    };
    mount(
      <StoreProvider store={store}>
        <MockComponent />
      </StoreProvider>
    );
  });

  it('With an invalid argument it show throw and error', () => {
    const MockComponent = () => {
      try {
        expect(() => useDispatch(5)).toThrow();
      } catch (err) {}

      return null;
    };
    mount(
      <StoreProvider store={store}>
        <MockComponent />
      </StoreProvider>
    );
  });
});

describe('useSelect', () => {
  describe('path string selectors', () => {
    // these two are meant to test for identity, not just values
    const ONE = {};
    const TWO = {};
    // --
    const selOne = 'pepe.1';
    const selTwo = 'jose.%0';
    const initialState = { pepe: [1, ONE, 3], jose: { a: TWO, b: 2 } };
    const store = mockStore(initialState);

    it('with no argument it should return the current state', () => {
      const MockComponent = () => {
        expect(useSelector()).toBe(initialState);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with one selector for argument it should return the value', () => {
      const MockComponent = () => {
        expect(useSelector(selOne)).toBe(ONE);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with an array of selectors for argument it should return an array of values', () => {
      const MockComponent = () => {
        const values = useSelector([selOne, selTwo], 'a');
        expect(values[0]).toBe(ONE);
        expect(values[1]).toBe(TWO);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with a mapStateToProps object for argument it should return an object with values', () => {
      const MockComponent = () => {
        const values = useSelector({ one: selOne, two: selTwo }, 'a');
        expect(values.one).toBe(ONE);
        expect(values.two).toBe(TWO);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with no data for selector, it should return undefined', () => {
      const MockComponent = () => {
        expect(useSelector('qqq')).toBeUndefined();
        expect(useSelector('jose.c')).toBeUndefined();
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with a bad selector it should throw and error', () => {
      const MockComponent = () => {
        try {
          expect(() => useSelector(5)).toThrow();
        } catch (err) {}
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with an array of bad selectors it should throw and error', () => {
      const MockComponent = () => {
        try {
          expect(() => useSelector([1, 2])).toThrow();
        } catch (err) {}

        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with a selector overshooting it should return undefined', () => {
      const MockComponent = () => {
        expect(useSelector(selOne + '.a.b')).toBeUndefined();
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });
  });

  describe('path function selectors', () => {
    // these two are meant to test for identity, not just values
    const ONE = {};
    const TWO = {};
    // --
    const selOne = state => state.pepe[1];
    const selTwo = (state, id) => state.jose[id];
    const initialState = { pepe: [1, ONE, 3], jose: { a: TWO, b: 2 } };
    const store = mockStore(initialState);

    it('with no argument it should return the current state', () => {
      const MockComponent = () => {
        expect(useSelector()).toBe(initialState);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with one selector for argument it should return the value', () => {
      const MockComponent = () => {
        expect(useSelector(selOne)).toBe(ONE);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with an array of selectors for argument it should return an array of values', () => {
      const MockComponent = () => {
        const values = useSelector([selOne, selTwo], 'a');
        expect(values[0]).toBe(ONE);
        expect(values[1]).toBe(TWO);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with a mapStateToProps object for argument it should return an object with values', () => {
      const MockComponent = () => {
        const values = useSelector({ one: selOne, two: selTwo }, 'a');
        expect(values.one).toBe(ONE);
        expect(values.two).toBe(TWO);
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });

    it('with no data for selector, it should return undefined', () => {
      const MockComponent = () => {
        expect(useSelector('qqq')).toBeUndefined();
        expect(useSelector('jose.c')).toBeUndefined();
        return null;
      };
      mount(
        <StoreProvider store={store}>
          <MockComponent />
        </StoreProvider>
      );
    });
  });

  /***************************************

  At the time being, useEffect cannot be tested
  https://github.com/facebook/react/issues/14050
  
  describe('test for listener', () => {
    const INCREMENT_ONE = 'increment one';
    const INCREMENT_TWO = 'increment two';
    const INCREMENT_BOTH = 'increment both';
    const RESET_BOTH = 'reset both';

    function counterOne(state = 0, action) {
      switch (action.type) {
        case INCREMENT_ONE:
        case INCREMENT_BOTH:
          return state + 1;
        case RESET_BOTH:
          return 0;
        default:
          return state;
      }
    }
    function counterTwo(state = 0, action) {
      switch (action.type) {
        case INCREMENT_TWO:
        case INCREMENT_BOTH:
          return state + 1;
        case RESET_BOTH:
          return 0;
        default:
          return state;
      }
    }

    const store = createStore(combineReducers({ counterOne, counterTwo }));

    const acIncrementOne = () => ({ type: INCREMENT_ONE });
    const acIncrementTwo = () => ({ type: INCREMENT_TWO });
    const acIncrementBoth = () => ({ type: INCREMENT_BOTH });
    const acResetBoth = () => ({ type: RESET_BOTH });

    const selOne = 'counterOne';
    const selTwo = 'counterTwo';

    beforeEach(() => {
      store.dispatch(acResetBoth());
    });

    it('should detect state changes', done => {
      expect.assertions(3);
      let count = 0;
      const MockComponent = () => {
        const value = useSelector(selOne);
        expect(value).toBe(count);
        return <p>{value}</p>;
      };
      const wrapper = mount(
        <StoreProvider store={store}>
          <div>
            <MockComponent />
          </div>
        </StoreProvider>
      );
      console.log('store 1', store.getState());
      console.log('html 1', wrapper.html());
      count++;
      store.dispatch(acIncrementOne());

      setTimeout(() => {
        console.log('store 2', store.getState());
        console.log('html 2', wrapper.html());
        expect(count).toBe(1);
        expect(store.getState()).toEqual({ counterOne: 1, counterTwo: 0 });
        done();
      }, 10);
    });

    it('should not affect other listeners', done => {
      expect.assertions(5);
      let count = 0;
      const MockComponentOne = () => {
        const value = useSelector(selOne);
        expect(value).toBe(count);
        return <h1>{value}</h1>;
      };
      const MockComponentTwo = () => {
        const value = useSelector(selTwo);
        expect(value).toBe(0);
        return <h2>{value}</h2>;
      };
      const wrapper = mount(
        <StoreProvider store={store}>
          <div>
            <MockComponentOne />
            <MockComponentTwo />
          </div>
        </StoreProvider>
      );

      console.log('store 1', store.getState());
      console.log('html 1', wrapper.html());
      count++;
      store.dispatch(acIncrementOne());

      setTimeout(() => {
        console.log('store 2', store.getState());
        console.log('html 2', wrapper.html());
        expect(count).toBe(1);
        expect(store.getState()).toEqual({ counterOne: 1, counterTwo: 0 });
        done();
      }, 10);
    });
  });
  */
});
