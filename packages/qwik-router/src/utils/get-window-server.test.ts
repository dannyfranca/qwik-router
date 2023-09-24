// @vitest-environment node
import { getHistory, getWindow } from './get-window';

describe(getWindow.name, () => {
  it('Does not return the window', async () => {
    expect(getWindow()).toBeUndefined();
  });
});

describe(getHistory.name, () => {
  it('Does not return the history', async () => {
    expect(getHistory()).toBeUndefined();
  });
});
