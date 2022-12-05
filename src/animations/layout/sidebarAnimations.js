export const fluidSlideAnimationVariants = {
  open: {
    x: 0,
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
  closed: {
    x: '100%',
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
};

export const staticSlideAnimationVariants = {
  open: {
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0',
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
  closed: {
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
};
