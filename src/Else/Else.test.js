import React from "react";
import { shallow, mount, render } from "enzyme";

import { Else, Decide, If } from "../index";

describe("'Else' component Tests", () => {
  it("If Else has a condition prop", () => {
    let wrapper = <Else condition={true}>Else Statement</Else>;
    shallow(wrapper);
    expect(global.console.warn).toBeCalledWith(
      "Else cannot contain a condition, The condition is ignored."
    );
  });

  it("If Else has no condition prop", () => {
    let wrapper = <Else/>;
    shallow(wrapper);
    expect(shallow(wrapper).html()).toBeNull()
  });

});
