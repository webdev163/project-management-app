export const handleUserKeyUp = (event: { code: string }): void => {
  if (event.code === 'Enter') {
    // add input on enter
  }
};

export const handleFocus = (event: React.ChangeEvent<HTMLTextAreaElement>) => event.target.select();
