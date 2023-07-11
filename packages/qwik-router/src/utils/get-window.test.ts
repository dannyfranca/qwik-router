import { getWindow } from './get-window';

describe(getWindow.name, () => {
  it('Does not return the window', async () => {
    expect(getWindow()).toBeUndefined();
  });
});
