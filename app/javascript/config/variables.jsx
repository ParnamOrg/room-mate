const currentDomainUrl = window.location.origin;
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

export { currentDomainUrl };
export { csrfToken };
