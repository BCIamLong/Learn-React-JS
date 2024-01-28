function Loader() {
  return (
    <>
      <div className="absolute inset-0 bg-slate-50/10 backdrop-blur-sm">
        <div className="loader absolute right-2/4 top-2/4 z-50 -translate-y-2/4 translate-x-2/4">
          {/* <p>Loading...</p> */}
        </div>
      </div>
      {/* the second way we can use the flex box trick to center this loader right
      <div className="absolute inset-0 bg-slate-50/10 backdrop-blur-sm flex items-center justify-center">
<div className="loader absolute z-50 "></div>
</div> */}
    </>
  );
}

export default Loader;
