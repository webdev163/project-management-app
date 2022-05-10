export const handleUserKeyUp = (event: { code: string }): void => {
  if (event.code === 'Enter') {
    console.log();
  }
};

export const handleFocus = (event: React.ChangeEvent<HTMLTextAreaElement>) => event.target.select();
