import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { AuthReducer } from "./AuthReducer";

configure({ adapter: new Adapter() });

describe("Auth Reducer", () => {
  it("Return Default state", () => {
    expect(AuthReducer(undefined, {})).toEqual({
      tokenId: null,
      userId: null,
      loading: false,
      error: null,
      tokenLoaded: false,
    });
  });
});
