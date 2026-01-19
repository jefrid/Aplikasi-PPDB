export const PrimaryButton = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
  >
    {children}
  </button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <button
    {...props}
    className="bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-4 rounded-md transition-colors"
  >
    {children}
  </button>
); 