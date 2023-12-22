export const generatePassword = (length:number) => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let newPassword = '';
  for (let i = 0; i < length; i++) {
    newPassword += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }

  return newPassword;
};
