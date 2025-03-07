const InstaBtn = () => {
    return (
      <button className="cursor-pointer text-zinc-200 flex gap-2 items-center bg-black p-2 rounded-lg font-medium text-sm hover:bg-[#111] transition-all ease-in duration-200">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 fill-zinc-200"
        >
          <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9zm0 2h9c1.93 0 3.5 1.57 3.5 3.5v9c0 1.93-1.57 3.5-3.5 3.5h-9C5.57 20 4 18.43 4 16.5v-9C4 5.57 5.57 4 7.5 4zm9 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM12 6.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
        </svg>
      </button>
    );
  };
  
  export default InstaBtn;
  