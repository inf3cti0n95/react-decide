import React from "react";
import { shallow, mount, render } from "enzyme";

import { ElseIf, Decide, If } from "../index";

describe("'If' component Tests", () => {
  it("If", () => {
    let wrapper = <If/>;
    shallow(wrapper);
    expect(shallow(wrapper).html()).toBeNull()
  });

});
