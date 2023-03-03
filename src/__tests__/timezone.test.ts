test("should always be UTC", () => {
  expect(new Date().getTimezoneOffset()).toBe(0);
});

export {};
