export const Card = () => {
  return (
    <button className="border rounded-md flex flex-col p-6 gap-6">
      <div className="flex gap-2 items-start justify-between w-full">
        <div className="flex flex-col gap-2 text-left">
          <span className="leading-4 ">Balance</span>
          <div className="text-3xl">3,590€</div>
        </div>
        <img src="/mastercard.png" className="h-5" />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 text-lg">
          <span>****</span>
          <span>****</span>
          <span>****</span>
          <span>1234</span>
        </div>
      </div>
    </button>
  );
};
