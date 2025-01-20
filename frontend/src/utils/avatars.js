const avatars = Array.from({ length: 12 }, (_, index) => {
  const avatarNumber = index + 1;
  return `/images/avatars/avatar-${avatarNumber}.png`;
});

export default avatars;
