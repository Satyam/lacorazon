import React, { useContext } from 'react';
import { createStore, combineReducers } from 'redux';
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

  describe('test for listener', () => {
    const INCREMENT_ONE = 'increment one';
    const INCREMENT_TWO = 'increment two';
    const INCREMENT_BOTH = 'increment both';
    const INCREMENT_OBJ = 'increment object';
    const RESET_ALL = 'reset all';

    function counterOne(state = 0, action) {
      switch (action.type) {
        case INCREMENT_ONE:
        case INCREMENT_BOTH:
          return state + 1;
        case RESET_ALL:
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
        case RESET_ALL:
          return 0;
        default:
          return state;
      }
    }

    function objectOne(state = { counter: 0, fixed: 'fixed' }, action) {
      switch (action.type) {
        case INCREMENT_OBJ:
          return {
            ...state,
            counter: state.counter + 1
          };
        case RESET_ALL:
          return {
            ...state,
            counter: 0
          };
        default:
          return state;
      }
    }

    const store = createStore(
      combineReducers({ counterOne, counterTwo, objectOne })
    );

    const acIncrementOne = () => ({ type: INCREMENT_ONE });
    // const acIncrementTwo = () => ({ type: INCREMENT_TWO });
    const acIncrementBoth = () => ({ type: INCREMENT_BOTH });
    const acIncrementObj = () => ({ type: INCREMENT_OBJ });
    const acResetAll = () => ({ type: RESET_ALL });

    const selOne = 'counterOne';
    const selTwo = 'counterTwo';
    const selObjCounter = 'objectOne.counter';
    const selObjFixed = 'objectOne.fixed';

    const MockComponentOne = jest.fn(() => {
      const value = useSelector(selOne);
      return <h1>{value}</h1>;
    });
    const MockComponentTwo = jest.fn(() => {
      const value = useSelector(selTwo);
      return <h2>{value}</h2>;
    });
    const MockComponentObjCounter = jest.fn(() => {
      const counter = useSelector(selObjCounter);
      return <h3>{counter}</h3>;
    });

    const MockComponentObjFixed = jest.fn(() => {
      const fixed = useSelector(selObjFixed);
      return <h4>{fixed}</h4>;
    });

    const MockComponentObjArraySel = jest.fn(() => {
      const [counter, fixed] = useSelector([selObjCounter, selObjFixed]);
      return (
        <div>
          <h3>{counter}</h3>
          <h4>{fixed}</h4>
        </div>
      );
    });

    const MockComponentObjObjSel = jest.fn(() => {
      const props = useSelector({ counter: selObjCounter, fixed: selObjFixed });
      return (
        <div>
          <h3>{props.counter}</h3>
          <h4>{props.fixed}</h4>
        </div>
      );
    });
    beforeEach(() => {
      store.dispatch(acResetAll());
      jest.clearAllMocks();
    });

    it('should detect state changes', () => {
      const wrapper = mount(
        <StoreProvider store={store}>
          <MockComponentOne />
        </StoreProvider>
      );
      expect(MockComponentOne).toBeCalled();
      MockComponentOne.mockClear();
      expect(wrapper.find('h1').text()).toBe('0');

      store.dispatch(acIncrementOne());

      expect(store.getState()).toEqual({
        counterOne: 1,
        counterTwo: 0,
        objectOne: { counter: 0, fixed: 'fixed' }
      });
      expect(wrapper.find('h1').text()).toBe('1');
      expect(MockComponentOne).toBeCalled();
    });

    it('should not affect other listeners', () => {
      const wrapper = mount(
        <StoreProvider store={store}>
          <MockComponentOne />
          <MockComponentTwo />
        </StoreProvider>
      );

      expect(MockComponentOne).toBeCalled();
      expect(MockComponentTwo).toBeCalled();
      MockComponentOne.mockClear();
      MockComponentTwo.mockClear();

      expect(wrapper.find('h1').text()).toBe('0');
      expect(wrapper.find('h2').text()).toBe('0');

      store.dispatch(acIncrementOne());

      expect(MockComponentOne).toBeCalled();
      expect(MockComponentTwo).not.toBeCalled();
      expect(wrapper.find('h1').text()).toBe('1');
      expect(wrapper.find('h2').text()).toBe('0');
      expect(store.getState()).toEqual({
        counterOne: 1,
        counterTwo: 0,
        objectOne: { counter: 0, fixed: 'fixed' }
      });
    });

    it('should do two at a time', () => {
      const wrapper = mount(
        <StoreProvider store={store}>
          <MockComponentOne />
          <MockComponentTwo />
        </StoreProvider>
      );

      expect(MockComponentOne).toBeCalled();
      expect(MockComponentTwo).toBeCalled();
      MockComponentOne.mockClear();
      MockComponentTwo.mockClear();
      expect(wrapper.find('h1').text()).toBe('0');
      expect(wrapper.find('h2').text()).toBe('0');

      store.dispatch(acIncrementBoth());

      expect(MockComponentOne).toBeCalled();
      expect(MockComponentTwo).toBeCalled();
      expect(wrapper.find('h1').text()).toBe('1');
      expect(wrapper.find('h2').text()).toBe('1');
      expect(store.getState()).toEqual({
        counterOne: 1,
        counterTwo: 1,
        objectOne: { counter: 0, fixed: 'fixed' }
      });
    });

    it('should detect state changes in object properties', () => {
      const wrapper = mount(
        <StoreProvider store={store}>
          <MockComponentObjCounter />
          <MockComponentObjFixed />
        </StoreProvider>
      );
      expect(MockComponentObjCounter).toBeCalled();
      expect(wrapper.find('h3').text()).toBe('0');
      expect(MockComponentObjFixed).toBeCalled();
      expect(wrapper.find('h4').text()).toBe('fixed');
      MockComponentObjCounter.mockClear();
      MockComponentObjFixed.mockClear();

      store.dispatch(acIncrementObj());

      expect(store.getState()).toEqual({
        counterOne: 0,
        counterTwo: 0,
        objectOne: { counter: 1, fixed: 'fixed' }
      });
      expect(MockComponentObjCounter).toBeCalled();
      expect(wrapper.find('h3').text()).toBe('1');
      expect(MockComponentObjFixed).not.toBeCalled();
      expect(wrapper.find('h4').text()).toBe('fixed');
    });

    it('should detect state changes in array of selectors', () => {
      const wrapper = mount(
        <StoreProvider store={store}>
          <MockComponentObjArraySel />
        </StoreProvider>
      );
      expect(MockComponentObjArraySel).toBeCalled();
      MockComponentObjArraySel.mockClear();
      expect(wrapper.find('h3').text()).toBe('0');
      expect(wrapper.find('h4').text()).toBe('fixed');

      store.dispatch(acIncrementObj());

      expect(store.getState()).toEqual({
        counterOne: 0,
        counterTwo: 0,
        objectOne: { counter: 1, fixed: 'fixed' }
      });
      expect(MockComponentObjArraySel).toBeCalled();
      expect(wrapper.find('h3').text()).toBe('1');
      expect(wrapper.find('h4').text()).toBe('fixed');
    });

    it('should detect state changes in object of selectors', () => {
      const wrapper = mount(
        <StoreProvider store={store}>
          <MockComponentObjObjSel />
        </StoreProvider>
      );
      expect(MockComponentObjObjSel).toBeCalledTimes(1);
      expect(wrapper.find('h3').text()).toBe('0');
      expect(wrapper.find('h4').text()).toBe('fixed');

      store.dispatch(acIncrementObj());

      expect(store.getState()).toEqual({
        counterOne: 0,
        counterTwo: 0,
        objectOne: { counter: 1, fixed: 'fixed' }
      });
      expect(MockComponentObjObjSel).toBeCalledTimes(2);
      expect(wrapper.find('h3').text()).toBe('1');
      expect(wrapper.find('h4').text()).toBe('fixed');
    });
  });
});
