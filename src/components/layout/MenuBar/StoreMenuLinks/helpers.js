export const isLinkActive = (link, pathname) => {
  return link.pathes.includes(pathname);
};

export const isSubLinkActive = (subLink, pathname) => {
  if (subLink.href !== '/') {
    return pathname === subLink.href;
  } else {
    return pathname === '/';
  }
};
