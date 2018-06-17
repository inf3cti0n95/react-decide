import React from "react";
import { shallow, mount, render } from "enzyme";

import { ElseIf, Decide, If } from "../index";

describe("'ElseIf' component Tests", () => {
  it("ElseIf", () => {
    let wrapper = <ElseIf/>;
    shallow(wrapper);
    expect(shallow(wrapper).html()).toBeNull()
  });

});
