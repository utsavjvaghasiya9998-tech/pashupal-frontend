const Loader = ({ text = "Loading..." }) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-cente">

            {/* Animated Circle */}
            <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 rounded-full border-4 border-green-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
            </div>

            {/* App Icon / Emoji */}

            {/* Loading Text */}
            <p className="text-green-800 text-lg font-semibold tracking-wide">
                {text}
            </p>

            <p className="text-green-600 text-sm mt-1">
                Please wait, fetching data...
            </p>
        </div>
    );
};

export default Loader;
