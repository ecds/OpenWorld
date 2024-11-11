const CodeError = ({ error }: { error: Error }) => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          ERROR: {error.message}
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48">
          Stack Trace:
        </p>
        <div className="text-left">
          <pre>{error.stack}</pre>
        </div>
      </div>
    </section>
  );
};

export default CodeError;
