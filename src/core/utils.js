export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'L\'identifiant ne peut pas être vide.';
  //if (!re.test(email)) return 'Ooops! Nous avons besoin d\'une adresse e-mail valide.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Le mot de passe ne peut pas être vide.';

  return '';
};

export const nameValidator = name => {
  if (!name || name.length <= 0) return 'Login ne peut pas être vide';

  return '';
};
