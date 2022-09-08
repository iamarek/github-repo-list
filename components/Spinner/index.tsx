const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className=" border-r-transparent spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
        role="status"
      >
        <span className="invisible">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
