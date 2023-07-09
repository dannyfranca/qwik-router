import { getWindow } from "@/utils/get-window";

describe(getWindow.name, () => {
  it("Does not return the window", async () => {
    expect(getWindow()).toBeUndefined();
  });
});
