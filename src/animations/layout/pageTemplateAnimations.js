export const desktopTemplateAnimationVariants = {
  default: {
    width: 'calc(100% - 391px)',
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
  wide: {
    width: 'calc(100% - 77px)',
    transition: {
      ease: 'linear',
      duration: 0.1,
    },
  },
};

export const mobileTemplateAnimationVariants = {
  default: {
    height: '100%',
    transition: {
      ease: 'backIn',
      delay: 0.1,
    },
  },
  wide: {
    height: '100%',
    transition: {
      ease: 'backOut',
    },
  },
};
